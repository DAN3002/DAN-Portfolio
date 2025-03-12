import { useState } from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';

function ProjectList({ projects }) {
	const [selectedTag, setSelectedTag] = useState('All');

	const tags = ['All', ...new Set(projects.flatMap((project) => project.tags))];

	const filteredProjects = selectedTag === 'All'
		? projects
		: projects.filter((project) => project.tags.includes(selectedTag));

	return (
		<div>
			<div className="filter-buttons">
				{tags.map((tag) => (
					<button
						key={tag}
						className={`btn ${selectedTag === tag ? 'active' : ''}`}
						onClick={() => setSelectedTag(tag)}
						type="button"
					>
						{tag}
					</button>
				))}
			</div>
			<div className="project-list">
				{filteredProjects.map((project) => (
					<div key={project.id} className="project-item">
						<div className="project-content">
							<h4>{project.title}</h4>
							<span className="project-tags">{project.tags.join(', ')}</span>
							<p>{parse(project.shortDescription)}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

ProjectList.propTypes = {
	projects: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string.isRequired,
		thumbnail: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		tags: PropTypes.arrayOf(PropTypes.string).isRequired,
		shortDescription: PropTypes.string.isRequired,
	})).isRequired,
};

export default ProjectList;
