import PropTypes from 'prop-types';
import resolveImageSrc from './resolveImageSrc';

/* eslint-disable react/jsx-props-no-spreading, eol-last */
// Use a JS default parameter for `alt` instead of the deprecated `defaultProps`
// on function components (removed in a future React major).
function Image({ src, alt = '', ...rest }) {
	const resolvedSrc = resolveImageSrc(src);

	return <img src={resolvedSrc} alt={alt} {...rest} />;
}

Image.propTypes = {
	src: PropTypes.string.isRequired,
	// Default provided via JS default parameter above instead of the deprecated
	// `Image.defaultProps`, so silence airbnb's require-default-props here.
	// eslint-disable-next-line react/require-default-props
	alt: PropTypes.string,
};

export default Image;
