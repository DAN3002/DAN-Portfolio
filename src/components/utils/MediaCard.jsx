import PropTypes from 'prop-types';
import clsx from 'clsx';
import LazyImage from './LazyImage';

/**
 * Equal-height media card used by the Certifications and Achievements grids.
 *
 * Layout contract (so cards line up across a row):
 *  - Fixed-height image area (`imageHeight`) with the thumbnail centred/contained.
 *  - Flex-column body where the title + meta sit directly under the image. The grid
 *    stretches every card to the tallest in the row, keeping heights uniform.
 *
 * Keeps the `work-content` class + anchor `href` so custom.js's magnific-popup
 * binding still attaches to the card (opening the credential / achievement modal).
 */
function MediaCard({
	href,
	category = undefined,
	title,
	meta = [],
	thumb,
	alt,
	imageHeight = 240,
	containImage = false,
	onClick = undefined,
}) {
	return (
		<a
			href={href}
			onClick={onClick}
			className={clsx(
				'group flex h-full flex-col overflow-hidden rounded-xl border border-white/10',
				'bg-surface text-white no-underline shadow-card transition-all duration-300 ease-out',
				'hover:-translate-y-1.5 hover:border-gold/40 hover:bg-surface-light hover:shadow-card-hover',
				'focus:outline-none focus-visible:ring-2 focus-visible:ring-gold',
				'focus-visible:ring-offset-2 focus-visible:ring-offset-page',
				'motion-reduce:transform-none motion-reduce:transition-none',
			)}
		>
			{/* Image area — uniform height across every card */}
			<div
				className={clsx(
					'relative flex items-center justify-center overflow-hidden bg-page-deep/40',
					containImage ? 'p-6' : '',
				)}
				style={{ height: `${imageHeight}px` }}
			>
				{category && (
					<span className="absolute left-5 top-0 z-10 rounded-b-[15px] bg-accent px-2 py-0.5 text-[13px] font-medium text-white">
						{category}
					</span>
				)}
				<LazyImage
					src={thumb}
					alt={alt}
					className={clsx(
						'transition-transform duration-300 group-hover:scale-105 motion-reduce:transform-none',
						containImage
							? 'max-h-full max-w-full object-contain'
							: 'h-full w-full object-cover',
					)}
					style={containImage
						? { width: 'auto', height: '100%', objectFit: 'contain' }
						: { width: '100%', height: '100%', objectFit: 'cover' }}
				/>
			</div>

			{/* Body — title + meta grouped directly under the image. The grid stretches
			    every card to the tallest in the row, so heights stay uniform. */}
			<div className="flex flex-1 flex-col p-5">
				<h4 className="mb-0 text-lg font-semibold leading-snug text-white transition-colors duration-300 group-hover:text-gold">
					{title}
				</h4>
				{meta && meta.filter(Boolean).length > 0 && (
					<ul className="mb-0 flex list-none flex-wrap items-center gap-x-2 gap-y-1 p-0 pt-3 text-sm text-white/60">
						{meta.filter(Boolean).map((item, index) => (
							<li key={item} className="flex items-center">
								{/* Dot separator between meta items (mirrors the old .meta li:after) */}
								{index > 0 && (
									<span className="mr-2 inline-block h-[3px] w-[3px] rounded-full bg-white/40" aria-hidden="true" />
								)}
								<span>{item}</span>
							</li>
						))}
					</ul>
				)}
			</div>
		</a>
	);
}

MediaCard.propTypes = {
	href: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	thumb: PropTypes.string.isRequired,
	alt: PropTypes.string.isRequired,
	// Optional props — defaults supplied via JS default parameters above (not the
	// deprecated `defaultProps`), so silence airbnb's require-default-props rule.
	/* eslint-disable react/require-default-props */
	category: PropTypes.string,
	meta: PropTypes.arrayOf(PropTypes.string),
	imageHeight: PropTypes.number,
	containImage: PropTypes.bool,
	onClick: PropTypes.func,
	/* eslint-enable react/require-default-props */
};

export default MediaCard;
