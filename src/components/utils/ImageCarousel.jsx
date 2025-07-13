import {
	useState,
	useRef,
	useEffect,
	useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import LazyImage from './LazyImage';
import '../../styles/image-carousel.css';

// Helper to preload an image and return a promise
function preload(src) {
	return new Promise((resolve) => {
		const img = new Image();
		img.onload = resolve;
		img.onerror = resolve;
		img.src = src;
	});
}

function ImageCarousel({ images }) {
	// Keep reference to carousel root to attach native event listeners.
	// This still works after MagnificPopup moves the node out of React's tree.
	const carouselRef = useRef(null);

	const [currentIndex, setCurrentIndex] = useState(0);

	const hasMultiple = images.length > 1;

	// Track when the first image is fully loaded so we can preload others
	const [firstImageLoaded, setFirstImageLoaded] = useState(false);

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
		if (!hasMultiple) return undefined; // no buttons, no listener
		const root = carouselRef.current;
		if (!root) return undefined;

		const handleClick = (e) => {
			const { target } = e;
			if (target.closest('.prev')) {
				prevImage();
			} else if (target.closest('.next')) {
				nextImage();
			}
		};

		root.addEventListener('click', handleClick);
		return () => {
			root.removeEventListener('click', handleClick);
		};
	}, [prevImage, nextImage, hasMultiple]);

	// Preload remaining images once the first one has loaded
	useEffect(() => {
		if (!firstImageLoaded) return;
		const rest = images.slice(1).map((src) => (
			src.startsWith('http') ? src : `${process.env.PUBLIC_URL}${src}`
		));
		rest.forEach((src) => {
			preload(src);
		});
	}, [firstImageLoaded, images]);

	return (
		<div className="image-carousel" ref={carouselRef}>
			{hasMultiple && (
				<button
					type="button"
					className="carousel-nav prev"
					onClick={prevImage}
					aria-label="Previous image"
				>
					<i className="fas fa-chevron-left" />
				</button>
			)}

			<div className="carousel-image-wrapper">
				<SwitchTransition mode="out-in">
					<CSSTransition key={currentIndex} timeout={300} classNames="fade" unmountOnExit>
						{currentIndex === 0 && !firstImageLoaded ? (
							<LazyImage
								src={images[0]}
								alt="Project screenshot 1"
								className="carousel-image"
								afterLoad={() => setFirstImageLoaded(true)}
							/>
						) : (
							<img
								src={images[currentIndex].startsWith('http') ? images[currentIndex] : `${process.env.PUBLIC_URL}${images[currentIndex]}`}
								alt={`Project screenshot ${currentIndex + 1}`}
								className="carousel-image"
							/>
						)}
					</CSSTransition>
				</SwitchTransition>
			</div>

			{hasMultiple && (
				<button
					type="button"
					className="carousel-nav next"
					onClick={nextImage}
					aria-label="Next image"
				>
					<i className="fas fa-chevron-right" />
				</button>
			)}
		</div>
	);
}

ImageCarousel.propTypes = {
	images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ImageCarousel;
