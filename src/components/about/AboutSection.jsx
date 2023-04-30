/* eslint-disable no-undef */
import { useState, useEffect } from 'react';

import data from '../../data/data';
import { getGithubData } from '../../data/github';
// import useAnalyticsEventTracker from '../../hooks/useAnalyticsEventTracker';

function AboutSection() {
	const [githubData, setGithubData] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [yearsOfExperience, setYearsOfExperience] = useState(0);
	// const gaEventTracker = useAnalyticsEventTracker();

	const { PUBLIC_URL } = process.env;
	const { about, contactEmail, startDate } = data;

	const currentDomain = window.location.hostname;

	useEffect(() => {
		getGithubData().then((res) => {
			setGithubData(res);
			setIsLoading(false);

			let years = new Date().getFullYear() - startDate - 0.5;
			if (new Date().getMonth() > 6) {
				years += 0.5;
			}

			setYearsOfExperience(years);
		});
	}, []);

	useEffect(() => {
		if (!isLoading) {
			$('.count').counterUp({
				delay: 10,
				time: 1500,
			});
		}
	}, [isLoading]);

	return (
		<div>
			<div className="row">
				<div className="col-md-3">
					<div className="text-center text-md-left">
						<img
							src={`${PUBLIC_URL}/images/dan3002/profile.png`}
							alt="Nguyễn Đình Anh Profile"
						/>
					</div>
					<div className="spacer d-md-none d-lg-none" data-height={30} />
				</div>
				<div className="col-md-9 triangle-left-md triangle-top-sm">
					<div className="rounded bg-dark shadow-light padding-30">
						<div className="row">
							<div className="col-md-12">
								<p>
									I'm
									{' '}
									<b>Nguyễn Đình Anh,</b>
								</p>
								{about.paragraphs.map((item) => (
									<p>{item}</p>
								))}
								<div
									className="spacer d-md-none d-lg-none"
									data-height={30}
								/>
							</div>
							<div className="col-md-12">
								<hr className="breakline" />

								<ul className="info-list row">
									<li className="col-md-6">
										<i className="fas fa-angle-right" />
										<b>Website: </b>
										<a
											href={`https://${currentDomain}`}
											target="_blank"
											rel="noreferrer"
										>
											{currentDomain}
										</a>
									</li>
									<li className="col-md-6">
										<i className="fas fa-angle-right" />
										<b>Email: </b>
										<a
											href={`mailto:${contactEmail}`}
											target="_blank"
											rel="noreferrer"
										>
											{contactEmail}
										</a>
									</li>
									<li className="col-md-6">
										<i className="fas fa-angle-right" />
										<b>Phone: </b>
										<span>(+84) 914085246</span>
									</li>
									<li className="col-md-6">
										<i className="fas fa-angle-right" />
										<b>Languages: </b>
										<span>Vietnamese, English</span>
									</li>
									{/* <li>
										<i className="fas fa-angle-right" />
										<b>Location:</b>
										<span>Ha Noi, Viet Nam</span>
									</li> */}
								</ul>

								<div className="mt-3">
									<a
										href={`${PUBLIC_URL}/Resume_Nguyễn Đình Anh.pdf`}
										className="btn btn-default"
										target="_blank"
										rel="noreferrer"
										onClick={() => {
											gtag('event', 'rum-page-scroll', {
												event_label:
													'Click Download Resume',
												event_category: 'About Section',
												non_interaction: true,
											});
										}}
									>
										Download Resume
									</a>
								</div>
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
								<em className="count">{yearsOfExperience}</em>
							</h3>
							<p className="mb-0">Years’ Experience</p>
						</div>
					</div>
					<div className="spacer d-md-none d-lg-none" data-height={30} />
				</div>
				<div className="col-md-3 col-sm-6">
					<div className="fact-item">
						<span className="icon icon-fire" />
						<div className="details">
							<h3 className="mb-0 mt-0 number">
								<em className="count">{githubData.numberOfRepos}</em>
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
								<em className="count">{githubData.totalCommits}</em>
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
								<em className="count">{githubData.totalStars}</em>
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
