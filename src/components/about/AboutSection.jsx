import data from '../../data/data';

function AboutSection() {
	const { PUBLIC_URL } = process.env;
	const { about } = data;

	return (
		<div>
			<div className="row">
				<div className="col-md-3">
					<div className="text-center text-md-left">
						<img src={`${PUBLIC_URL}/images/dan3002/profile.png`} alt="Profile" />
					</div>
					<div className="spacer d-md-none d-lg-none" data-height={30} />
				</div>
				<div className="col-md-9 triangle-left-md triangle-top-sm">
					<div className="rounded bg-dark shadow-light padding-30">
						<div className="row">
							<div className="col-md-6">
								<p>
									I'm
									{' '}
									<b>Nguyen Dinh Anh,</b>
								</p>
								{about.paragraphs.map((item) => <p>{item}</p>)}
								<div className="mt-3">
									<a
										href={`${PUBLIC_URL}/CV_NguyenDinhAnh.pdf`}
										className="btn btn-default"
										target="_blank"
										rel="noreferrer"
									>
										Download CV
									</a>
								</div>
								<div
									className="spacer d-md-none d-lg-none"
									data-height={30}
								/>
							</div>
							<div className="col-md-6">
								<ul className="info-list">
									<li>
										<i className="fas fa-angle-right" />
										<b>Website:</b>
										<a
											href="https://dan3002-cv.web.app/"
											target="_blank"
											rel="noreferrer"
										>
											dan3002-cv.web.app
										</a>
									</li>
									<li>
										<i className="fas fa-angle-right" />
										<b>Email:</b>
										<a
											href="mailto:dinhanh300229@gmail.com"
											target="_blank"
											rel="noreferrer"
										>
											dinhanh300229@gmail.com
										</a>
									</li>
									<li>
										<i className="fas fa-angle-right" />
										<b>Phone:</b>
										<span>(+84) 914085246</span>
									</li>
									<li>
										<i className="fas fa-angle-right" />
										<b>Languages:</b>
										<span>Vietnamese, English</span>
									</li>
									<li>
										<i className="fas fa-angle-right" />
										<b>Location:</b>
										<span>Ha Noi, Viet Nam</span>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="spacer" data-height={70} />
			<div className="row">
				<div className="col-md-3 col-sm-6">
					<div className="fact-item">
						<span className="icon icon-badge" />
						<div className="details">
							<h3 className="mb-0 mt-0 number">
								<em className="count">2.5</em>
							</h3>
							<p className="mb-0">Years’ Experience</p>
						</div>
					</div>
				</div>
				<div className="col-md-3 col-sm-6">
					<div className="fact-item">
						<span className="icon icon-fire" />
						<div className="details">
							<h3 className="mb-0 mt-0 number">
								<em className="count">25</em>
							</h3>
							<p className="mb-0">Github Repositories</p>
						</div>
					</div>
					<div className="spacer d-md-none d-lg-none" data-height={30} />
				</div>
				<div className="col-md-3 col-sm-6">
					<div className="fact-item">
						<span className="icon icon-chart" />
						<div className="details">
							<h3 className="mb-0 mt-0 number">
								<em className="count">458</em>
							</h3>
							<p className="mb-0">Github Commits</p>
						</div>
					</div>
					<div className="spacer d-md-none d-lg-none" data-height={30} />
				</div>
				<div className="col-md-3 col-sm-6">
					<div className="fact-item">
						<span className="icon icon-star" />
						<div className="details">
							<h3 className="mb-0 mt-0 number">
								<em className="count">19</em>
							</h3>
							<p className="mb-0">Github Star</p>
						</div>
					</div>
					<div className="spacer d-md-none d-lg-none" data-height={30} />
				</div>
			</div>
		</div>
	);
}

export default AboutSection;
