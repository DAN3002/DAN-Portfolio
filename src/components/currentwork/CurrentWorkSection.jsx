import parse from 'html-react-parser';

import data from '../../data/data';
import { track, Events } from '../../lib/analytics';
import '../../styles/current-work.css';

function CurrentWorkSection() {
	const { currentWork } = data;

	if (!currentWork) return null;

	const {
		company,
		role,
		timeline,
		url,
		linkedin,
		tagline,
		description,
		videoId,
		videoTitle,
		highlights = [],
	} = currentWork;

	return (
		<div className="current-work fadeIn wow animated">
			<div className="cw-card rounded shadow-dark">
				{/* Header */}
				<div className="cw-header">
					<div className="cw-header-main">
						<h3 className="cw-company">{company}</h3>
						<p className="cw-role">
							{role}
							<span className="cw-sep">•</span>
							<span className="cw-timeline">{timeline}</span>
						</p>
						{tagline && <p className="cw-tagline">{tagline}</p>}
					</div>

					<div className="cw-links">
						{url && (
							<a
								href={url}
								target="_blank"
								rel="noopener noreferrer"
								className="cw-icon-btn"
								aria-label={`Visit ${company} website`}
								title="Website"
								onClick={() => track(Events.CURRENT_WORK_LINK, { type: 'website' })}
							>
								<i className="fas fa-globe" aria-hidden="true" />
							</a>
						)}
						{linkedin && (
							<a
								href={linkedin}
								target="_blank"
								rel="noopener noreferrer"
								className="cw-icon-btn cw-icon-btn-linkedin"
								aria-label={`${company} on LinkedIn`}
								title="LinkedIn"
								onClick={() => track(Events.CURRENT_WORK_LINK, { type: 'linkedin' })}
							>
								<i className="fab fa-linkedin-in" aria-hidden="true" />
							</a>
						)}
					</div>
				</div>

				<p className="cw-description">{parse(description)}</p>

				{/* Full-width video */}
				{videoId && (
					<div className="cw-video">
						<div className="cw-video-frame">
							<iframe
								src={`https://www.youtube-nocookie.com/embed/${videoId}?vq=hd1080&rel=0&modestbranding=1&showinfo=0&iv_load_policy=3&color=white`}
								title={videoTitle || `${company} video`}
								frameBorder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
								allowFullScreen
								loading="lazy"
							/>
						</div>
					</div>
				)}

				{/* Highlights below the video */}
				{highlights.length > 0 && (
					<div className="cw-highlights">
						{highlights.map((item) => (
							<div className="cw-highlight" key={item.title}>
								<span className="cw-highlight-icon">
									<i className={item.icon} aria-hidden="true" />
								</span>
								<div className="cw-highlight-body">
									<h5 className="cw-highlight-title">{item.title}</h5>
									<p className="cw-highlight-text">{item.text}</p>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}

export default CurrentWorkSection;
