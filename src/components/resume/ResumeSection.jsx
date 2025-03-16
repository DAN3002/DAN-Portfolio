import { useState, useEffect } from 'react';
import parse from 'html-react-parser';

import TimelineConatiner from './TimelineConatiner';
import data from '../../data/data';
import MoocCertificate from './MoocCertificate';

// New component for the Others section
function OthersSection({ others }) {
	return (
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
						<ul>
							{others.map((item, index) => (
								<li key={index}>{parse(item)}</li>
							))}
						</ul>
					</div>
				</div>
				<span className="line" />
			</div>
		</div>
	);
}

function ResumeSection() {
	const {
		education, experience, activities, others,
	} = data;

	const [isMobile, setIsMobile] = useState(false);

	// Check if screen is mobile size
	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768); // Bootstrap's md breakpoint is 768px
		};

		// Initial check
		checkMobile();

		// Add event listener for window resize
		window.addEventListener('resize', checkMobile);

		// Cleanup on unmount
		return () => window.removeEventListener('resize', checkMobile);
	}, []);

	// Render components in the mobile order
	if (isMobile) {
		return (
			<div className="row">
				<div className="col-12">
					<TimelineConatiner
						title="Education"
						timelineData={education}
						icon="edu"
					/>

					<TimelineConatiner
						title="Experiences"
						timelineData={experience}
						icon="exp"
					/>

					<TimelineConatiner
						title="Activities"
						timelineData={activities}
						icon="activity"
					/>

					<MoocCertificate />

					<OthersSection others={others} />
				</div>
			</div>
		);
	}

	// Desktop layout (unchanged)
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

				<OthersSection others={others} />
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
