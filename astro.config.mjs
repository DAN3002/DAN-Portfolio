// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';

// Static site served from GitHub Pages behind Cloudflare at the custom domain
// in public/CNAME, so no `base` is needed.
export default defineConfig({
	site: 'https://dan3002.id.vn',
	trailingSlash: 'ignore',
	integrations: [
		sitemap(),
		icon({
			// Only bundle the icons we reference, not the full sets.
			include: {
				lucide: [
					'arrow-right', 'arrow-up-right', 'check', 'chevron-down', 'chevron-left', 'chevron-right',
					'copy', 'download', 'external-link', 'loader-circle', 'mail', 'map-pin',
					'medal', 'menu', 'moon', 'send', 'sun', 'trophy', 'x',
				],
				'simple-icons': ['github', 'linkedin'],
			},
		}),
	],
	// Screenshots are huge (up to 3775px, 2.5 MB). Each <Picture> asks for a
	// few explicit widths in AVIF with a WebP fallback (see lib/images.ts),
	// instead of a global responsive layout that emits ~20 sizes x 3 formats.
	vite: {
		plugins: [tailwindcss()],
	},
});
