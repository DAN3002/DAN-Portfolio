import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

function LazyImage({
	src, alt, className, width, height, style,
}) {
	const { PUBLIC_URL } = process.env;

	const combinedStyle = {
		width: width ? `${width}px` : '100%',
		height: height ? `${height}px` : 'auto',
		...style,
	};

	return (
		<LazyLoadImage
			src={src.startsWith('http') ? src : `${PUBLIC_URL}${src}`}
			alt={alt}
			effect="blur"
			style={combinedStyle}
			className={className}
			placeholderSrc={`${PUBLIC_URL}/images/placeholder.jpg`}
			wrapperClassName="lazy-load-image-wrapper"
		/>
	);
}

export default LazyImage;
