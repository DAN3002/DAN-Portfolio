function ExperienceSection() {
	return (
		<div className="row">
			<div className="col-md-6">
				{/* timeline wrapper */}
				<div className="timeline edu bg-dark rounded shadow-light padding-30 overflow-hidden">
					{/* timeline item */}
					<div className="timeline-container wow fadeInUp">
						<div className="content">
							<span className="time">Jan 2022 - Now</span>
							<h3 className="title">FPT University</h3>
							<ul>
								<li>Major: Software Engineering.</li>
								<li>100% scholarship for four years.</li>
							</ul>
						</div>
					</div>
					{/* timeline item */}
					<div className="timeline-container wow fadeInUp">
						<div className="content">
							<span className="time">Aug 2018 - Dec 2021</span>
							<h3 className="title">FUNiX University</h3>
							<ul>
								<li>Major: Software Engineering.</li>
								<li>
									Have a 20% scholarship each semester and become an
									active student.
								</li>
							</ul>
						</div>
					</div>
					{/* main line */}
					<span className="line" />
				</div>
			</div>
			<div className="col-md-6">
				{/* responsive spacer */}
				<div className="spacer d-md-none d-lg-none" data-height={30} />
				{/* timeline wrapper */}
				<div className="timeline exp bg-dark rounded shadow-light padding-30 overflow-hidden">
					<div className="timeline-container wow fadeInUp">
						<div className="content">
							<span className="time">Aug 2021 - Present</span>
							<h3 className="title">FUNiX xSeries</h3>
							<p>Program Development Officer and Backend Developer</p>
							<ul>
								<li>
									Develop and maintain a web system to connect students
									with mentors using MeteorJS and MongoDB.
								</li>
								<li>
									Develop xSeries’s Program about Data Engineering,
									Machine Learning, ...
								</li>
							</ul>
						</div>
					</div>
					<div className="timeline-container wow fadeInUp">
						<div className="content">
							<span className="time">Aug 2020 - Aug 2021</span>
							<h3 className="title">FPT Software</h3>
							<p>Backend Developer</p>
							<ul>
								<li>
									Develop and maintain a web system to connect students
									with mentors using MeteorJS and MongoDB.
								</li>
							</ul>
						</div>
					</div>
					<div className="timeline-container wow fadeInUp">
						<div className="content">
							<span className="time">Aug 2019 - Aug 2020</span>
							<h3 className="title">FUNiX's IT department</h3>
							<p>Backend Developer</p>
							<ul>
								<li>
									Develop learning tool and management software using
									Javascript, NodeJS and Firebase.
								</li>
								<li>
									Build and deploy Chrome Extension to translate
									subtitles on the MOOC website (Udemy, Coursera) and
									translate the content of the page into Vietnamese.
								</li>
								<li>Support to operate some systems: LMS, CRM</li>
							</ul>
						</div>
					</div>
					{/* main line */}
					<span className="line" />
				</div>
			</div>
		</div>
	);
}

export default ExperienceSection;
