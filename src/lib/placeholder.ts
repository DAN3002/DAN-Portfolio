// Blur-up placeholders: a ~16px-wide copy of each image, inlined in the HTML as
// a data URL (~300-600 bytes). It paints with the first frame, so an image area is
// never blank while the real AVIF/WebP downloads; SmartImage fades the real one in.
// Build-time only (sharp + the source file on disk).

import sharp from 'sharp';
import type { ImageMetadata } from 'astro';

if (typeof window !== 'undefined') throw new Error('lib/placeholder.ts is build-time only');

const cache = new Map<string, Promise<Placeholder>>();

export interface Placeholder {
	/** Tiny blurred image as a data URL. */
	src: string;
	/** Average colour, shown underneath while even the tiny image decodes. */
	color: string;
}

export function placeholder(img: ImageMetadata): Promise<Placeholder> {
	const path = (img as ImageMetadata & { fsPath?: string }).fsPath;
	const key = path ?? img.src;
	let p = cache.get(key);
	if (!p) {
		p = (async () => {
			if (!path) return { src: '', color: 'var(--line)' };
			try {
				const base = sharp(path).resize(16, 16, { fit: 'inside' });
				// Average colour of the visible pixels only: transparent areas (the round
				// portrait's corners) must not darken it.
				const [buf, px] = await Promise.all([
					base.clone().webp({ quality: 40 }).toBuffer(),
					sharp(path).resize(32, 32, { fit: 'inside' }).ensureAlpha().raw().toBuffer({ resolveWithObject: true }),
				]);
				let r = 0, g = 0, b = 0, n = 0;
				for (let i = 0; i < px.data.length; i += 4) {
					const a = px.data[i + 3]! / 255;
					if (a < 0.5) continue;
					r += px.data[i]!; g += px.data[i + 1]!; b += px.data[i + 2]!; n += 1;
				}
				const color = n ? `rgb(${Math.round(r / n)} ${Math.round(g / n)} ${Math.round(b / n)})` : 'var(--line)';
				return { src: `data:image/webp;base64,${buf.toString('base64')}`, color };
			} catch {
				return { src: '', color: 'var(--line)' };
			}
		})();
		cache.set(key, p);
	}
	return p;
}
