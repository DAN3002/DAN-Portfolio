const resolveImageSrc = (src) => {
	if (!src) return src;

	// If the src is already an absolute URL, just return it
	if (src.startsWith('http')) {
		return src;
	}

	// Make sure the relative src always starts with a single leading slash
	const normalisedSrc = src.startsWith('/') ? src : `/${src}`;

	// On production – point to the jsDelivr CDN copy of the repository’s public folder
	if (process.env.NODE_ENV === 'production') {
		// Change the base path here if the repo or branch ever changes
		return `https://cdn.jsdelivr.net/gh/DAN3002/DAN-Portfolio@main/public${normalisedSrc}`;
	}

	// On development – keep the local public folder reference
	const { PUBLIC_URL = '' } = process.env;
	return `${PUBLIC_URL}${normalisedSrc}`;
};

export default resolveImageSrc;
