import TimelineConatiner from './TimelineConatiner';
import data from '../../data/data';

function ResumeSection() {
	const { education, experience, activities } = data;

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
					icon="edu"
				/>
			</div>
			<div className="col-md-6">
				<TimelineConatiner
					title="Experiences"
					timelineData={experience}
					icon="exp"
				/>
			</div>
		</div>
	);
}

export default ResumeSection;
