import { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import clsx from 'clsx';
import ImageCarousel from '../utils/ImageCarousel';

// Map a project's tags to a representative Font Awesome icon.
const getProjectIcon = (projectTags) => {
	if (projectTags.includes('AI')) return 'fas fa-robot';
	if (projectTags.includes('Fullstack')) return 'fas fa-layer-group';
	if (projectTags.includes('Crawler')) return 'fas fa-spider';
	if (projectTags.includes('Backend')) return 'fas fa-server';
	if (projectTags.includes('Frontend')) return 'fas fa-desktop';
	if (projectTags.includes('DevOps')) return 'fas fa-server';
	return 'fas fa-code'; // Default icon
};

const track = (event) => {
	if (typeof window.umami !== 'undefined') window.umami.track(event);
};

function ProjectList({ projects }) {
	const [selectedTag, setSelectedTag] = useState('All');
	const [currentPage, setCurrentPage] = useState(1);
	const [animationClass, setAnimationClass] = useState('');
	const [isMobile, setIsMobile] = useState(false);

	// Track viewport so we can switch grid density + pagination style.
	useEffect(() => {
		const checkIfMobile = () => setIsMobile(window.innerWidth <= 768);
		checkIfMobile();
		window.addEventListener('resize', checkIfMobile);
		return () => window.removeEventListener('resize', checkIfMobile);
	}, []);

	// Show more cards per page on larger screens.
	const itemsPerPage = isMobile ? 4 : 6;

	// Unique tag list (with an "All" pseudo-tag) and per-tag counts for the filter pills.
	const tags = useMemo(
		() => ['All', ...new Set(projects.flatMap((project) => project.tags))],
		[projects],
	);
	const countForTag = (tag) => (tag === 'All'
		? projects.length
		: projects.filter((p) => p.tags.includes(tag)).length);

	const filteredProjects = selectedTag === 'All'
		? projects
		: projects.filter((project) => project.tags.includes(selectedTag));

	const totalPages = Math.max(1, Math.ceil(filteredProjects.length / itemsPerPage));
	const currentProjects = filteredProjects.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage,
	);

	const handlePageChange = (pageNumber) => {
		if (pageNumber < 1 || pageNumber > totalPages) return;
		setAnimationClass('animate-list-out');
		setTimeout(() => {
			setCurrentPage(pageNumber);
			setAnimationClass('animate-list-in');
		}, 250);
	};

	const handleSelectTag = (tag) => {
		track(`filter-tag-${tag}`);
		setSelectedTag(tag);
		setCurrentPage(1);
	};

	return (
		<div className="wow animated fadeIn">
			{/* ---------------------------------------------------------------- */}
			{/* Filter pills — accessible toggle group with per-tag counts.      */}
			{/* ---------------------------------------------------------------- */}
			<div className="mb-7 flex flex-wrap gap-2.5" role="group" aria-label="Filter projects by category">
				{tags.map((tag) => {
					const active = selectedTag === tag;
					return (
						<button
							key={tag}
							type="button"
							aria-pressed={active}
							onClick={() => handleSelectTag(tag)}
							className={clsx(
								'inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium',
								'transition-colors duration-300 focus:outline-none focus-visible:ring-2',
								'focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-page',
								active
									? 'bg-accent text-white shadow-accent'
									: 'bg-surface-button text-white/90 hover:bg-surface-button-hover hover:text-gold',
							)}
						>
							{tag}
							<span
								className={clsx(
									'rounded-full px-1.5 text-xs tabular-nums',
									active ? 'bg-white/25 text-white' : 'bg-black/20 text-white/70',
								)}
							>
								{countForTag(tag)}
							</span>
						</button>
					);
				})}
			</div>

			{/* ---------------------------------------------------------------- */}
			{/* Responsive card grid: 1 col (mobile) / 2 (md) / 3 (xl).          */}
			{/* ---------------------------------------------------------------- */}
			<div
				className={clsx(
					'grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3',
					animationClass,
				)}
			>
				{currentProjects.map((project) => {
					const projectIndex = projects.findIndex((p) => p === project);
					return (
						<a
							key={project.title}
							href={`#small-dialog-project-${projectIndex}`}
							className={clsx(
								// Keep `project-content` so custom.js's magnific-popup binding fires.
								'project-content project-card group p-5 no-underline',
								'focus:outline-none focus-visible:ring-2 focus-visible:ring-gold',
								'focus-visible:ring-offset-2 focus-visible:ring-offset-page',
								'motion-reduce:transform-none motion-reduce:transition-none',
							)}
							onClick={() => track(`open-project-${project.title}`)}
						>
							{/* Title row with category icon */}
							<h4 className="mb-2 flex items-start gap-2.5 text-lg font-semibold text-white">
								<i
									className={clsx(
										getProjectIcon(project.tags),
										'mt-1 text-gold transition-transform duration-300',
										'group-hover:scale-110 motion-reduce:transform-none',
									)}
									aria-hidden="true"
								/>
								<span className="leading-snug">{project.title}</span>
							</h4>

							{/* Tag chips */}
							<div className="mb-3 flex flex-wrap gap-1.5">
								{project.tags.map((tag) => (
									<span
										key={tag}
										className="rounded-full bg-gold/10 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-gold"
									>
										{tag}
									</span>
								))}
							</div>

							{/* Description (clamped to 3 lines) */}
							<p className="mb-4 line-clamp-3 text-sm leading-relaxed text-white/80">
								{project.description}
							</p>

							{/* Tech stack pinned to the bottom */}
							{project.techs && project.techs.length > 0 && (
								<div className="mt-auto">
									<div className="mb-1.5 text-sm font-medium text-gold">Tech Stack:</div>
									<div className="flex flex-wrap gap-1.5">
										{project.techs.map((tech) => (
											<span key={tech} className="tech-pill">{tech}</span>
										))}
									</div>
								</div>
							)}

							{/* Affordance hint that appears on hover/focus */}
							<span
								className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
								aria-hidden="true"
							>
								View details
								<i className="fas fa-arrow-right text-xs" />
							</span>
						</a>
					);
				})}
			</div>

			{/* ---------------------------------------------------------------- */}
			{/* Project popups (magnific-popup). Render ALL projects so hook     */}
			{/* count stays stable and every modal id exists for its anchor.     */}
			{/* ---------------------------------------------------------------- */}
			{projects.map((project, index) => {
				let imagesToShow = [];
				if (project.images && project.images.length > 0) {
					imagesToShow = project.images;
				} else if (project.thumbnail) {
					imagesToShow = [project.thumbnail];
				}

				return (
					<div
						key={project.title}
						id={`small-dialog-project-${index}`}
						className="white-popup zoom-anim-dialog mfp-hide"
					>
						<ImageCarousel images={imagesToShow} />
						<h2>
							<i className={`${getProjectIcon(project.tags)} mr-2 text-gold`} aria-hidden="true" />
							{project.title}
							<span className="project-role-badge">{project.role}</span>
						</h2>

						<div className="spacer" data-height={5} />
						<div className="my-4">
							<p className="project-description">{project.description}</p>

							{project.contents && project.contents.length > 0 && (
								<ul className="project-features">
									{project.contents.map((content) => (
										<li key={content}>{parse(content)}</li>
									))}
								</ul>
							)}
						</div>

						{project.techs && project.techs.length > 0 && (
							<>
								<div className="spacer" data-height={15} />
								<div className="popup-tech-stack">
									<div className="popup-tech-stack-label">
										<i className="fas fa-code mr-2" aria-hidden="true" />
										Technologies Used:
									</div>
									<div className="popup-tech-badges">
										{project.techs.map((tech) => (
											<span key={tech} className="popup-tech-badge">{tech}</span>
										))}
									</div>
								</div>
							</>
						)}

						{project.source && (
							<>
								<div className="spacer" data-height={10} />
								<div className="project-links">
									<a
										href={project.source}
										target="_blank"
										rel="noopener noreferrer"
										className="btn btn-default"
										onClick={() => track(`view-source-${project.title}`)}
									>
										View Source
									</a>
								</div>
							</>
						)}
					</div>
				);
			})}

			{/* ---------------------------------------------------------------- */}
			{/* Pagination — numbered on desktop, compact indicator on mobile.   */}
			{/* ---------------------------------------------------------------- */}
			{totalPages > 1 && (
				<div className="mt-8 flex items-center justify-center gap-2">
					<button
						type="button"
						onClick={() => handlePageChange(currentPage - 1)}
						disabled={currentPage === 1}
						aria-label="Previous page"
						className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-button text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-surface-button-hover hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
					>
						<i className="fas fa-chevron-left text-xs" />
					</button>

					{!isMobile ? (
						Array.from({ length: totalPages }, (_, index) => {
							const page = index + 1;
							const active = currentPage === page;
							return (
								<button
									key={page}
									type="button"
									onClick={() => handlePageChange(page)}
									aria-label={`Go to page ${page}`}
									aria-current={active ? 'page' : undefined}
									className={clsx(
										'flex h-8 min-w-8 items-center justify-center rounded-full px-2 text-[13px] font-medium tabular-nums',
										'transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold',
										active
											? 'bg-accent text-white shadow-accent'
											: 'bg-surface-button text-white hover:-translate-y-0.5 hover:bg-surface-button-hover hover:text-gold',
									)}
								>
									{page}
								</button>
							);
						})
					) : (
						<span className="mx-4 font-medium tabular-nums text-gold">
							{currentPage}
							{' / '}
							{totalPages}
						</span>
					)}

					<button
						type="button"
						onClick={() => handlePageChange(currentPage + 1)}
						disabled={currentPage === totalPages}
						aria-label="Next page"
						className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-button text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-surface-button-hover hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
					>
						<i className="fas fa-chevron-right text-xs" />
					</button>
				</div>
			)}
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
		techs: PropTypes.arrayOf(PropTypes.string),
		source: PropTypes.string,
		images: PropTypes.arrayOf(PropTypes.string),
	})).isRequired,
};

export default ProjectList;
