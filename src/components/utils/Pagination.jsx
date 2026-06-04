import PropTypes from 'prop-types';
import clsx from 'clsx';

// Shared circular-button styling for every pagination control.
const baseBtn = 'flex items-center justify-center rounded-full text-sm font-medium tabular-nums '
	+ 'transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold '
	+ 'focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-reduce:transition-none';

/**
 * Accessible pager.
 *
 * Best practices applied (WAI-ARIA / design-system guidance):
 *  - Wrapped in a <nav aria-label="Pagination"> landmark with an <ul>/<li> list.
 *  - Active page marked with aria-current="page".
 *  - Prev/Next stay in the DOM and use `disabled` on the boundary pages (layout stays
 *    stable) with descriptive aria-labels.
 *  - On compact screens we collapse the number list into a "X / N" indicator.
 *
 * Active state uses the brand accent (red) for clear contrast against the dark theme.
 */
function Pagination({
	currentPage, totalPages, onPageChange, compact = false,
}) {
	if (totalPages <= 1) return null;

	const goTo = (page) => {
		if (page < 1 || page > totalPages || page === currentPage) return;
		onPageChange(page);
	};

	const isFirst = currentPage === 1;
	const isLast = currentPage === totalPages;

	return (
		<nav aria-label="Pagination" className="mt-9 flex justify-center">
			<ul className="m-0 flex list-none items-center gap-2 p-0">
				<li>
					<button
						type="button"
						onClick={() => goTo(currentPage - 1)}
						disabled={isFirst}
						aria-label="Go to previous page"
						className={clsx(
							baseBtn,
							'h-10 w-10 bg-surface-button text-white hover:-translate-y-0.5 hover:bg-surface-button-hover',
							'hover:text-gold disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0',
							'disabled:hover:bg-surface-button disabled:hover:text-white',
						)}
					>
						<i className="fas fa-chevron-left text-xs" aria-hidden="true" />
					</button>
				</li>

				{compact ? (
					<li>
						<span className="mx-3 select-none text-sm font-medium tabular-nums text-white/80">
							<span className="text-gold">{currentPage}</span>
							{' / '}
							{totalPages}
						</span>
					</li>
				) : (
					Array.from({ length: totalPages }, (_, index) => {
						const page = index + 1;
						const active = currentPage === page;
						return (
							<li key={page}>
								<button
									type="button"
									onClick={() => goTo(page)}
									aria-label={`Go to page ${page}`}
									aria-current={active ? 'page' : undefined}
									className={clsx(
										baseBtn,
										'h-10 w-10',
										active
											? 'bg-accent text-white shadow-accent'
											: 'bg-surface-button text-white hover:-translate-y-0.5 hover:bg-surface-button-hover hover:text-gold',
									)}
								>
									{page}
								</button>
							</li>
						);
					})
				)}

				<li>
					<button
						type="button"
						onClick={() => goTo(currentPage + 1)}
						disabled={isLast}
						aria-label="Go to next page"
						className={clsx(
							baseBtn,
							'h-10 w-10 bg-surface-button text-white hover:-translate-y-0.5 hover:bg-surface-button-hover',
							'hover:text-gold disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0',
							'disabled:hover:bg-surface-button disabled:hover:text-white',
						)}
					>
						<i className="fas fa-chevron-right text-xs" aria-hidden="true" />
					</button>
				</li>
			</ul>
		</nav>
	);
}

Pagination.propTypes = {
	currentPage: PropTypes.number.isRequired,
	totalPages: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired,
	// Default supplied via JS default parameter above (not the deprecated defaultProps).
	// eslint-disable-next-line react/require-default-props
	compact: PropTypes.bool,
};

export default Pagination;
