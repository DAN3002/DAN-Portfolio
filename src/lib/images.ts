// Shared <Picture> presets. AVIF first, WebP as the <img> fallback (every
// browser we target decodes one of them), so no heavy PNG/JPEG copies ship.
export const pictureFormats = ['avif'] as const;
export const fallbackFormat = 'webp' as const;

/** Widths per slot, with the matching `sizes` hint. */
export const slots = {
	// Hero portrait: one column (max-w-sm) below lg, then ~36vw capped by the container.
	hero: { widths: [360, 560, 840], sizes: '(min-width: 1280px) 460px, (min-width: 1024px) 36vw, 384px' },
	featuredLarge: { widths: [640, 1100, 1600], sizes: '(min-width: 1024px) 66vw, 100vw' },
	card: { widths: [400, 640, 900], sizes: '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw' },
	dialog: { widths: [640, 1000, 1400], sizes: '(min-width: 56rem) 56rem, 100vw' },
} as const;
