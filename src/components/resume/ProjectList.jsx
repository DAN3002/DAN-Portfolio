import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import LazyImage from '../utils/LazyImage';
import '../../styles/project-list.css';

function ProjectList({ projects }) {
	const [selectedTag, setSelectedTag] = useState('All');
	const [currentPage, setCurrentPage] = useState(1);
	const [animationClass, setAnimationClass] = useState('');
	const [isMobile, setIsMobile] = useState(false);

	// Check if mobile on component mount and window resize
	useEffect(() => {
		const checkIfMobile = () => {
			setIsMobile(window.innerWidth <= 768);
		};

		// Initial check
		checkIfMobile();

		// Add resize listener
		window.addEventListener('resize', checkIfMobile);

		// Cleanup
		return () => window.removeEventListener('resize', checkIfMobile);
	}, []);

	// Adjust items per page based on screen size
	const itemsPerPage = isMobile ? 2 : 4;

	const tags = ['All', ...new Set(projects.flatMap((project) => project.tags))];

	const filteredProjects = isMobile || selectedTag === 'All'
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

	// Helper function to determine the icon based on project tags
	const getProjectIcon = (projectTags) => {
		if (projectTags.includes('AI')) return 'fas fa-robot text-warning';
		if (projectTags.includes('Fullstack')) return 'fas fa-layer-group text-warning';
		if (projectTags.includes('Crawler')) return 'fas fa-spider text-warning';
		if (projectTags.includes('Backend')) return 'fas fa-server text-warning';
		if (projectTags.includes('Frontend')) return 'fas fa-desktop text-warning';
		return 'fas fa-code text-warning'; // Default icon
	};
	return (
		<div
			className="fadeIn wow animated"
		>
			{/* Only show filter buttons on desktop */}
			{!isMobile && (
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
			)}
			<div className={`project-list ${animationClass}`}>
				{currentProjects.map((project, index) => {
					// Calculate the actual index in the filtered projects array
					const projectIndex = filteredProjects.indexOf(project);

					return (
						<div key={index} className="project-item">
							<a href={`#small-dialog-project-${projectIndex}`} className="project-content">
								<h4>
									<i className={`${getProjectIcon(project.tags)} mr-2`} aria-hidden="true" />
									{project.title}
								</h4>
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
					<h2>
						<i className={`${getProjectIcon(project.tags)} mr-2`} aria-hidden="true" />
						{project.title}
						<span className="project-role-badge">{project.role}</span>
					</h2>

					<div className="spacer" data-height={5} />
					<div className="project-content-section">
						<p className="project-description">{project.description}</p>

						{/* Project details content */}
						{project.contents && project.contents.length > 0 && (
							<ul className="project-features">
								{project.contents.map((content, i) => (
									<li key={i}>{parse(content)}</li>
								))}
							</ul>
						)}
					</div>

					{/* Tech stack */}
					{project.techs && project.techs.length > 0 && (
						<>
							<div className="spacer" data-height={15} />
							<div className="popup-tech-stack">
								<div className="popup-tech-stack-label .icon-link">Technologies Used:</div>
								<div className="popup-tech-badges">
									{project.techs.map((tech, techIndex) => (
										<span key={techIndex} className="popup-tech-badge">
											{tech}
										</span>
									))}
								</div>
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

			<div className="pagination mobile-pagination">
				<button
					className="btn pagination-nav"
					onClick={() => handlePageChange(currentPage - 1)}
					type="button"
					disabled={currentPage === 1}
					aria-label="Previous page"
				>
					<i className="fas fa-chevron-left" />
				</button>

				{!isMobile ? (
				// Desktop pagination - show all page numbers
					Array.from({ length: totalPages }, (_, index) => (
						<button
							key={index + 1}
							className={`btn ${currentPage === index + 1 ? 'active' : ''}`}
							onClick={() => handlePageChange(index + 1)}
							type="button"
						>
							{index + 1}
						</button>
					))
				) : (
				// Mobile pagination - just show current page indicator
					<span className="pagination-indicator">
						{currentPage}
						{' '}
						/
						{totalPages}
					</span>
				)}

				<button
					className="btn pagination-nav"
					onClick={() => handlePageChange(currentPage + 1)}
					type="button"
					disabled={currentPage === totalPages}
					aria-label="Next page"
				>
					<i className="fas fa-chevron-right" />
				</button>
			</div>
		</div>
	);
}

ProjectList.propTypes = {
	projects: PropTypes.arrayOf(PropTypes.shape({
		thumbnail: PropTypes.string,
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
