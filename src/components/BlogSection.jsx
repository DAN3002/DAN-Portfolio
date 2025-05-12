import React, { useEffect, useState } from 'react';
import data from '../data/data';
import '../styles/components/blog-section.css';

function BlogSection() {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchRssFeed = async () => {
			try {
				const response = await fetch(data.externalLinks.blogRssFeed);
				const text = await response.text();
				const parser = new DOMParser();
				const xmlDoc = parser.parseFromString(text, 'text/xml');
				const items = xmlDoc.querySelectorAll('item');
				const latestPosts = Array.from(items).slice(0, 3).map((item) => {
					const title = item.querySelector('title').textContent;
					const link = item.querySelector('link').textContent;
					const pubDate = new Date(item.querySelector('pubDate').textContent);
					const description = item.querySelector('description').textContent;
					// Assume thumbnail is in the enclosure tag if available
					const thumbnail = item.querySelector('enclosure') ? item.querySelector('enclosure').getAttribute('url') : null;
					// Assume tags are in a category tag if available
					const tags = Array.from(item.querySelectorAll('category')).map((cat) => cat.textContent);
					return {
						title, link, pubDate, description, thumbnail, tags,
					};
				});
				setPosts(latestPosts);
			} catch (error) {
				// console.error('Error fetching RSS feed:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchRssFeed();
	}, []);

	if (loading) {
		return <div>Loading blog posts...</div>;
	}

	return (
		<div className="blog-section">
			<div className="blog-posts-grid">
				{posts.map((post, index) => (
					<div key={index} className="blog-post-card">
						<div className="blog-post-content">
							<h3 className="blog-title">{post.title}</h3>
							<div className="blog-meta">
								<span className="blog-time">{post.pubDate.toLocaleDateString()}</span>
								{post.tags && post.tags.length > 0 && (
									<div className="blog-tags">
										{post.tags.map((tag, i) => (
											<span key={i} className="blog-tag">{tag}</span>
										))}
									</div>
								)}
							</div>
							<p className="blog-description">{post.description}</p>
							<a href={post.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary blog-readmore">Read More</a>
						</div>
						{post.thumbnail && (
							<div className="blog-thumbnail">
								<img src={post.thumbnail} alt={post.title} />
							</div>
						)}
					</div>
				))}
			</div>
			<div className="blog-viewmore-wrapper">
				<a href={data.externalLinks.blog} target="_blank" rel="noopener noreferrer" className="btn btn-secondary blog-viewmore">View more blog</a>
			</div>
		</div>
	);
}

export default BlogSection;
