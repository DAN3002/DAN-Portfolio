import PropTypes from 'prop-types';
import resolveImageSrc from './resolveImageSrc';

/* eslint-disable react/jsx-props-no-spreading, eol-last */
function Image({ src, alt, ...rest }) {
	const resolvedSrc = resolveImageSrc(src);

	return <img src={resolvedSrc} alt={alt} {...rest} />;
}

Image.propTypes = {
	src: PropTypes.string.isRequired,
	alt: PropTypes.string,
};

Image.defaultProps = {
	alt: '',
};

export default Image;
