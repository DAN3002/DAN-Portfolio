function Section({ title, children }) {
	return (
		<section id="experience">
			<div className="container">
				<h2 className="section-title wow fadeInUp">{title}</h2>
				<div className="spacer" data-height={60} />

				{children}
			</div>
		</section>
	);
}

export default Section;
