import PropTypes from 'prop-types';
import clsx from 'clsx';

/**
 * Accessible filter pill used in toggle groups (e.g. the Projects category filter).
 *
 * Implemented as a real <button> with `aria-pressed` so screen readers announce the
 * selected state (WAI-ARIA toggle-button pattern). The parent should wrap a set of
 * these in a `role="group"` container with an `aria-label`.
 *
 * Visuals: consistent padding, a count badge with matching active/inactive contrast,
 * and a clear `:focus-visible` ring for keyboard users.
 */
function FilterPill({
	label, count = undefined, active = false, onClick,
}) {
	return (
		<button
			type="button"
			aria-pressed={active}
			onClick={onClick}
			className={clsx(
				'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium leading-none',
				'transition-colors duration-300 focus:outline-none focus-visible:ring-2',
				'focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-page',
				active
					? 'border-accent bg-accent text-white shadow-accent'
					: 'border-white/10 bg-surface-button text-white/90 hover:border-gold/40 hover:bg-surface-button-hover hover:text-gold',
			)}
		>
			{label}
			{typeof count === 'number' && (
				<span
					className={clsx(
						'inline-flex min-w-5 items-center justify-center rounded-full px-1.5 py-0.5 text-xs font-semibold leading-none tabular-nums',
						active ? 'bg-white/25 text-white' : 'bg-black/25 text-white/70',
					)}
				>
					{count}
				</span>
			)}
		</button>
	);
}

FilterPill.propTypes = {
	label: PropTypes.string.isRequired,
	// Defaults supplied via JS default parameters above (instead of the deprecated
	// `defaultProps` on function components), so silence airbnb's require-default-props.
	// eslint-disable-next-line react/require-default-props
	count: PropTypes.number,
	// eslint-disable-next-line react/require-default-props
	active: PropTypes.bool,
	onClick: PropTypes.func.isRequired,
};

export default FilterPill;
