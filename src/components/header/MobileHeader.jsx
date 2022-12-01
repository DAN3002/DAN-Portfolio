function MobileHeader() {
	return (
		<header className="mobile-header-1">
			<div className="container">
				{/* menu icon */}
				<div className="menu-icon d-inline-flex mr-4">
					<button type="button">
						<span />
					</button>
				</div>
				{/* logo image */}
				<div className="site-logo">
					<a href="index.html">
						<h2>D.A.N_3002</h2>
					</a>
				</div>
			</div>
		</header>
	);
}

export default MobileHeader;
