import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import resolveImageSrc from './resolveImageSrc';

function LazyImage({
	src,
	alt,
	className,
	width,
	height,
	style,
	afterLoad,
}) {
	const combinedStyle = {
		width: width ? `${width}px` : '100%',
		height: height ? `${height}px` : 'auto',
		...style,
	};

	return (
		<LazyLoadImage
			src={resolveImageSrc(src)}
			alt={alt}
			effect="blur"
			style={combinedStyle}
			className={className}
			placeholderSrc={resolveImageSrc('/images/placeholder.jpg')}
			wrapperClassName="lazy-load-image-wrapper"
			afterLoad={afterLoad}
		/>
	);
}

export default LazyImage;
