/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-props-no-spreading */
import { useEffect } from 'react';

function Carousel({
	items,
}) {
	useEffect(() => {
		$('.testimonials-wrapper').slick({
			dots: true,
			arrows: false,
			infinite: true,
			speed: 200,
			slidesToShow: 3,
			slidesToScroll: 1,
			// autoplay: true,
			// autoplaySpeed: 3000,
		});
	}, []);

	return (
		<div className="testimonials-wrapper">
			{items}
		</div>
	);
}

export default Carousel;
