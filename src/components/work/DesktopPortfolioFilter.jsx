function DesktopPortfolioFilter() {
	return (
		<ul className="portfolio-filter list-inline wow fadeInUp">
			<li className="current list-inline-item" data-filter="*">
				All
			</li>
			<li className="list-inline-item" data-filter=".webapp">
				Webapp
			</li>
			<li className="list-inline-item" data-filter=".ai">
				Artificial Intelligence
			</li>
			<li className="list-inline-item" data-filter=".other">
				Other
			</li>
		</ul>
	);
}

export default DesktopPortfolioFilter;
