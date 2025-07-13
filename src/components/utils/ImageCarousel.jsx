import {
	useState,
	useRef,
	useEffect,
	useCallback,
} from 'react';
import PropTypes from 'prop-types';
import LazyImage from './LazyImage';
import '../../styles/image-carousel.css';

function ImageCarousel({ images }) {
	// Keep reference to carousel root to attach native event listeners.
	// This still works after MagnificPopup moves the node out of React's tree.
	const carouselRef = useRef(null);

	const [currentIndex, setCurrentIndex] = useState(0);

	if (!images || images.length === 0) return null;

	// Handlers wrapped in useCallback to keep identity stable for the effect below
	const prevImage = useCallback(() => {
		setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
	}, [images.length]);

	const nextImage = useCallback(() => {
		setCurrentIndex((prev) => (prev + 1) % images.length);
	}, [images.length]);

	/* --------------------------------------------------------------------------
	| MagnificPopup detaches the inline element from React's root and moves it  |
	| elsewhere in the DOM. React's synthetic event delegation stops working    |
	| once the element is no longer inside the root container. To ensure        |
	| navigation buttons keep working, attach native event listeners directly   |
	| to the carousel element.                                                 |
	-------------------------------------------------------------------------- */
	useEffect(() => {
		const root = carouselRef.current;
		if (!root) return;

		const handleClick = (e) => {
			const { target } = e;
			if (target.closest('.prev')) {
				prevImage();
			} else if (target.closest('.next')) {
				nextImage();
			}
		};

		root.addEventListener('click', handleClick);
		// eslint-disable-next-line consistent-return
		return () => root.removeEventListener('click', handleClick);
	}, [prevImage, nextImage]);

	return (
		<div className="image-carousel" ref={carouselRef}>
			<button
				type="button"
				className="carousel-nav prev"
				onClick={prevImage}
				aria-label="Previous image"
			>
				<i className="fas fa-chevron-left" />
			</button>

			<div className="carousel-image-wrapper">
				<LazyImage
					key={currentIndex}
					src={images[currentIndex]}
					alt={`Project screenshot ${currentIndex + 1}`}
					className="carousel-image"
				/>
			</div>

			<button
				type="button"
				className="carousel-nav next"
				onClick={nextImage}
				aria-label="Next image"
			>
				<i className="fas fa-chevron-right" />
			</button>
		</div>
	);
}

ImageCarousel.propTypes = {
	images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ImageCarousel;
