/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-props-no-spreading */
import { useEffect } from 'react';

function Carousel() {
	useEffect(() => {
		$('.testimonials-wrapper').slick({
			dots: true,
			arrows: false,
			autoplay: true,
			autoplaySpeed: 3000,
		});
	}, []);

	return (
		<div className="testimonials-wrapper">
			<div className="testimonial-item text-center mx-auto">
				<div className="thumb mb-3 mx-auto">
					<img decoding="async" src="wp-content/uploads/sites/8/2021/01/avatar-1-3.svg" alt />
				</div>
				<h4 className="mt-3 mb-0">John Doe</h4>
				<span className="subtitle">Product designer at Dribbble</span>
				<div className="bg-white padding-30 shadow-dark rounded triangle-top position-relative mt-4">
					<p className="mb-0">
						I enjoy working with the theme and learn so much.
						You guys make the process fun and interesting.
						Good luck! 👍
					</p>
				</div>
			</div>
			<div className="testimonial-item text-center mx-auto">
				<div className="thumb mb-3 mx-auto">
					<img decoding="async" src="wp-content/uploads/sites/8/2021/01/avatar-3-1.svg" alt />
				</div>
				<h4 className="mt-3 mb-0">John Doe</h4>
				<span className="subtitle">Product designer at Dribbble</span>
				<div className="bg-white padding-30 shadow-dark rounded triangle-top position-relative mt-4">
					<p className="mb-0">
						I enjoy working with the theme and learn so much.
						You guys make the process fun and interesting.
						Good luck! 🔥
					</p>
				</div>
			</div>
		</div>
	);
}

export default Carousel;
