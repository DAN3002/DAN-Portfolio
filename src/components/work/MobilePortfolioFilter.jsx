function MobilePortfolioFilter() {
	return (
		<div className="pf-filter-wrapper">
			<select className="portfolio-filter-mobile">
				<option value="*">Everything</option>
				<option value=".creative">Creative</option>
				<option value=".art">Art</option>
				<option value=".design">Design</option>
				<option value=".branding">Branding</option>
			</select>
		</div>
	);
}

export default MobilePortfolioFilter;
