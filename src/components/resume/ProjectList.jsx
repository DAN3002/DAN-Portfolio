import { useState } from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import LazyImage from '../utils/LazyImage';

function ProjectList({ projects }) {
	const [selectedTag, setSelectedTag] = useState('All');
	const [currentPage, setCurrentPage] = useState(1);
	const [animationClass, setAnimationClass] = useState('');
	const itemsPerPage = 4;

	const tags = ['All', ...new Set(projects.flatMap((project) => project.tags))];

	const filteredProjects = selectedTag === 'All'
		? projects
		: projects.filter((project) => project.tags.includes(selectedTag));

	const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
	const currentProjects = filteredProjects.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage,
	);

	const handlePageChange = (pageNumber) => {
		if (pageNumber < 1 || pageNumber > totalPages) return;
		setAnimationClass('fade-out');
		setTimeout(() => {
			setCurrentPage(pageNumber);
			setAnimationClass('fade-in');
		}, 300);
	};

	return (
		<div>
			<div className="filter-buttons">
				{tags.map((tag) => (
					<button
						key={tag}
						className={`btn ${selectedTag === tag ? 'active' : ''}`}
						onClick={() => {
							setSelectedTag(tag);
							setCurrentPage(1); // Reset to first page on tag change
						}}
						type="button"
					>
						{tag}
					</button>
				))}
			</div>
			<div className={`project-list ${animationClass}`}>
				{currentProjects.map((project, index) => {
					// Calculate the actual index in the filtered projects array
					const projectIndex = filteredProjects.indexOf(project);

					return (
						<div key={index} className="project-item">
							<a href={`#small-dialog-project-${projectIndex}`} className="project-content">
								<h4>{project.title}</h4>
								<p className="line-clamp-3">{project.description}</p>

								{/* Tech stack section */}
								{project.techs && project.techs.length > 0 && (
									<div className="tech-stack">
										<div className="tech-stack-label">Tech Stack:</div>
										<div className="tech-badges">
											{project.techs.map((tech, techIndex) => (
												<span key={techIndex} className="tech-badge">
													{tech}
												</span>
											))}
										</div>
									</div>
								)}
							</a>
						</div>
					);
				})}
			</div>

			{/* Project Popup Modals - Including all projects, not just current page */}
			{filteredProjects.map((project, index) => (
				<div
					key={index}
					id={`small-dialog-project-${index}`}
					className="white-popup zoom-anim-dialog mfp-hide"
				>
					{project.thumbnail && (
						<LazyImage
							src={project.thumbnail}
							alt={project.title}
						/>
					)}
					<h2>{project.title}</h2>
					<div className="project-meta">
						<span className="project-role">{project.role}</span>
					</div>

					<div className="spacer" data-height={5} />
					<p>{project.description}</p>

					{/* Project details content */}
					{project.contents && project.contents.length > 0 && (
						<>
							<div className="spacer" data-height={5} />
							<h4>Key Features:</h4>
							<ul className="project-features">
								{project.contents.map((content, i) => (
									<li key={i}>{parse(content)}</li>
								))}
							</ul>
						</>
					)}

					{/* Tech stack */}
					{project.techs && project.techs.length > 0 && (
						<>
							<div className="spacer" data-height={10} />
							<h4>Technologies Used:</h4>
							<div className="popup-tech-badges">
								{project.techs.map((tech, techIndex) => (
									<span key={techIndex} className="popup-tech-badge">
										{tech}
									</span>
								))}
							</div>
						</>
					)}

					{/* Links section */}
					{project.source && (
						<>
							<div className="spacer" data-height={10} />
							<div className="project-links">
								<a
									href={project.source}
									target="_blank"
									rel="noopener noreferrer"
									className="btn btn-default"
								>
									View Source
								</a>
							</div>
						</>
					)}
				</div>
			))}

			<div className="pagination">
				<button
					className="btn"
					onClick={() => handlePageChange(currentPage - 1)}
					type="button"
					disabled={currentPage === 1}
				>
					Prev
				</button>
				{Array.from({ length: totalPages }, (_, index) => (
					<button
						key={index + 1}
						className={`btn ${currentPage === index + 1 ? 'active' : ''}`}
						onClick={() => handlePageChange(index + 1)}
						type="button"
					>
						{index + 1}
					</button>
				))}
				<button
					className="btn"
					onClick={() => handlePageChange(currentPage + 1)}
					type="button"
					disabled={currentPage === totalPages}
				>
					Next
				</button>
			</div>
		</div>
	);
}

ProjectList.propTypes = {
	projects: PropTypes.arrayOf(PropTypes.shape({
		thumbnail: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		tags: PropTypes.arrayOf(PropTypes.string).isRequired,
		role: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		contents: PropTypes.arrayOf(PropTypes.string).isRequired,
		techs: PropTypes.arrayOf(PropTypes.string), // Added tech stack
		source: PropTypes.string, // Optional source code URL
	})).isRequired,
};

export default ProjectList;
