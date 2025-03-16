import parse from 'html-react-parser';

import TimelineConatiner from './TimelineConatiner';
import data from '../../data/data';
import MoocCertificate from './MoocCertificate';

function ResumeSection() {
	const {
		education, experience, activities, others,
	} = data;

	return (
		<div className="row">
			<div className="col-md-6">
				<TimelineConatiner
					title="Education"
					timelineData={education}
					icon="edu"
				/>

				<TimelineConatiner
					title="Activities"
					timelineData={activities}
					icon="activity"
				/>
				<div>
					<h3>Others</h3>
					<div className="timeline other bg-dark rounded shadow-light padding-30 overflow-hidden">
						<div
							className="spacer d-md-none d-lg-none"
							data-height={30}
						/>
						<div className="timeline-container wow fadeInUp">
							<div className="content">
								<span className="time" />
								{/* <h3 className="title">12312</h3> */}
								<ul>
									{others.map((item) => (
										<li>{parse(item)}</li>
									))}
								</ul>
							</div>
						</div>
						<span className="line" />
					</div>
				</div>
			</div>
			<div className="col-md-6">
				<TimelineConatiner
					title="Experiences"
					timelineData={experience}
					icon="exp"
				/>
				<MoocCertificate />
			</div>
		</div>
	);
}

export default ResumeSection;
