import DesktopPortfolioFilter from './DesktopPortfolioFilter';
import MobilePortfolioFilter from './MobilePortfolioFilter';

function WorkSection() {
	const { PUBLIC_URL } = process.env;

	return (
		<div>
			<DesktopPortfolioFilter />
			<MobilePortfolioFilter />

			{/* portolio wrapper */}
			<div className="row portfolio-wrapper">
				{/* portfolio item */}
				<div className="col-md-4 col-sm-6 grid-item webapp">
					<a
						href="https://github.com/DAN3002/Doctors-Cyclop-Webapp"
						target="_blank"
						rel="noreferrer"
					>
						<div className="portfolio-item rounded shadow-dark">
							<div className="details">
								<span className="term">Webapp</span>
								<h4 className="title">Doctor Cylop Webapp</h4>
								<span className="more-button">
									<i className="icon-link" />
								</span>
							</div>
							<div className="thumb">
								<img
									src={`${PUBLIC_URL}/images/works/doctor-cylop-webapp.png`}
									alt="Doctor Cylop Webapp"
								/>
								<div className="mask" />
							</div>
						</div>
					</a>
				</div>
				{/* portfolio item */}
				<div className="col-md-4 col-sm-6 grid-item webapp">
					<a href="#small-dialog" className="work-content">
						<div className="portfolio-item rounded shadow-dark">
							<div className="details">
								<span className="term">Webapp</span>
								<h4 className="title">HF40</h4>
								<span className="more-button">
									<i className="icon-options" />
								</span>
							</div>
							<div className="thumb">
								<img src={`${PUBLIC_URL}/images/works/hf40.png`} alt="HF40" />
								<div className="mask" />
							</div>
						</div>
					</a>
					<div
						id="small-dialog"
						className="white-popup zoom-anim-dialog mfp-hide"
					>
						<img src={`${PUBLIC_URL}/images/works/hf40-full.png`} alt="HF40" />
						<h2>HF40 Webapp</h2>
						<p>
							HF40 is a web app to connect FUNiX's students with mentors
							base on
							{' '}
							<a href="https://github.com/RocketChat/Rocket.Chat">
								Rocketchat opensource
							</a>
							. You can chat, share a file or send a voice to another
							user.
						</p>
						<div style={{ marginLeft: 10 }}>
							<p style={{ margin: 0 }}>
								<b>Technologies:</b>
							</p>
							<ul>
								<li>MeteorJS</li>
								<li>MongoDB</li>
								<li>GCP</li>
							</ul>
						</div>
					</div>
				</div>
				{/* portfolio item */}
				<div className="col-md-4 col-sm-6 grid-item ai">
					<a
						href="https://github.com/thaiminhpv/Doctor-Cyclop-Hackathon-2021"
						target="_blank"
						rel="noreferrer"
					>
						<div className="portfolio-item rounded shadow-dark">
							<div className="details">
								<span className="term">Artificial Intelligence</span>
								<h4 className="title">Doctor Cylop Model</h4>
								<span className="more-button">
									<i className="icon-link" />
								</span>
							</div>
							<div className="thumb">
								<img
									src={`${PUBLIC_URL}/images/works/doctor-cylop.png`}
									alt="Doctor Cylop  Model"
								/>
								<div className="mask" />
							</div>
						</div>
					</a>
				</div>
				{/* portfolio item */}
				<div className="col-md-4 col-sm-6 grid-item other">
					<a href="#small-dialog-passport" className="work-content">
						<div className="portfolio-item rounded shadow-dark">
							<div className="details">
								<span className="term">Chrome Extension</span>
								<h4 className="title">FUNiX Passport</h4>
								<span className="more-button">
									<i className="icon-options" />
								</span>
							</div>
							<div className="thumb">
								<img
									src={`${PUBLIC_URL}/images/works/passport.png`}
									alt="FUNiX Passport"
								/>
								<div className="mask" />
							</div>
						</div>
					</a>
					<div
						id="small-dialog-passport"
						className="white-popup zoom-anim-dialog mfp-hide"
					>
						<img src={`${PUBLIC_URL}/images/works/passport-full.png`} alt="FUNiX Passport" />
						<h2>FUNiX Passport</h2>
						<p>
							This utility helps FUNiX students for learning online, ex:
							Vietnamese translation for course materials, highlight
							video's subtitles.
						</p>
						<div style={{ marginLeft: 10 }}>
							<p style={{ margin: 0 }}>
								<b>Technologies:</b>
							</p>
							<ul>
								<li>Vanilla Javascript</li>
								<li>Firebase</li>
							</ul>
						</div>
						<a
							href="https://chrome.google.com/webstore/detail/funix-passport/dnaplmbnakalhkdejkldfidpmpicdfhn?hl=vi"
							className="btn btn-default"
						>
							View on Store
						</a>
					</div>
				</div>
			</div>
			{/* more button */}
			<div className="load-more text-center mt-4">
				<span className="btn btn-default">
					<i className="fas fa-spinner" />
					{' '}
					Load more
				</span>
				{/* numbered pagination (hidden for infinite scroll) */}
				<ul className="portfolio-pagination list-inline d-none">
					<li className="list-inline-item">1</li>
					<li className="list-inline-item">
						<a href="works-2.html">2</a>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default WorkSection;
