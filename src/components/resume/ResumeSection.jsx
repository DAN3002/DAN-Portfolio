import TimelineConatiner from './TimelineConatiner';
import data from '../../data/data';

function ResumeSection() {
	const { education, experience } = data;

	return (
		<div className="row">
			<div className="col-md-6">
				<TimelineConatiner
					title="Education"
					timelineData={education}
					icon="edu"
				/>
			</div>
			<div className="col-md-6">
				<TimelineConatiner
					title="Experience"
					timelineData={experience}
					icon="exp"
				/>
			</div>
		</div>
	);
}

export default ResumeSection;
