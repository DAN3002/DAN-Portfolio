/* eslint-disable react/forbid-prop-types */
import parse from 'html-react-parser';
import PropTypes from 'prop-types';

function TimelineConatiner({ title, timelineData, icon }) {
	return (
		<>
			<h3>{title}</h3>
			<div className={`timeline ${icon} bg-dark rounded shadow-light padding-30 overflow-hidden`}>
				<div className="spacer d-md-none d-lg-none" data-height={30} />
				{timelineData.map((item) => (
					<div className="timeline-container wow fadeInUp">
						<div className="content">
							{item.timeline && (<span className="time">{item.timeline}</span>)}
							<h3 className="title">{item.title}</h3>
							{item.subtitle && (
								<>
									<span className="subtitle">{item.subtitle}</span>
									<div className="spacer" data-height={5} />
								</>
							)}
							<ul>
								{item.text.map((text) => (
									<li>{parse(text)}</li>
								))}
							</ul>
						</div>
					</div>
				))}
				<span className="line" />
			</div>
		</>
	);
}

TimelineConatiner.propTypes = {
	title: PropTypes.string.isRequired,
	timelineData: PropTypes.array.isRequired,
	icon: PropTypes.string.isRequired,
};

export default TimelineConatiner;
