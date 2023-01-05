import PropTypes from 'prop-types';

function Section({ id, title, children }) {
	return (
		<section id={id}>
			<div className="container">
				<h2 className="section-title wow fadeInUp">{title}</h2>
				<div className="spacer" data-height={60} />

				{children}
			</div>
		</section>
	);
}

Section.propTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
};

export default Section;
