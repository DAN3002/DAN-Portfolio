import type { ImageMetadata } from 'astro';

// Every image under src/assets, keyed by its path relative to src/assets.
// Going through Astro's pipeline means each one is resized and re-encoded
// (AVIF/WebP) at build time instead of shipping multi-MB PNGs.
const files = import.meta.glob<{ default: ImageMetadata }>(
	'/src/assets/**/*.{png,jpg,jpeg,webp}',
	{ eager: true },
);

export function asset(path: string): ImageMetadata {
	const mod = files[`/src/assets/${path}`];
	if (!mod) {
		// Fail the build, not the page: a typo in data.ts should never ship.
		throw new Error(`Missing image asset: src/assets/${path}`);
	}
	return mod.default;
}
