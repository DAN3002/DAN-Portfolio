import React, { useEffect, useState } from 'react';
import Image from './utils/Image';
import data from '../data/data';

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
		<div>
			<div className="mt-2 grid grid-cols-1 gap-8">
				{posts.map((post, index) => (
					<div
						key={index}
						className="flex min-h-[200px] flex-row overflow-hidden rounded-2xl bg-surface text-white shadow-[0_2px_16px_rgba(0,0,0,0.08)] transition-shadow duration-200 hover:bg-surface-alt hover:shadow-[0_4px_32px_rgba(0,0,0,0.16)]"
					>
						<div className="flex h-full flex-1 flex-col p-6">
							<h3 className="mb-2 text-xl font-semibold text-gold">{post.title}</h3>
							<div className="mb-2 flex flex-wrap items-center gap-4">
								<span className="text-[0.95rem] text-gold">{post.pubDate.toLocaleDateString()}</span>
								{post.tags && post.tags.length > 0 && (
									<div className="flex flex-wrap gap-2">
										{post.tags.map((tag, i) => (
											<span
												key={i}
												className="rounded-xl border border-gold bg-gold/10 px-3 py-0.5 text-sm font-medium text-gold"
											>
												{tag}
											</span>
										))}
									</div>
								)}
							</div>
							<p className="my-2 flex-auto text-white">{post.description}</p>
							<a
								href={post.link}
								target="_blank"
								rel="noopener noreferrer"
								className="mt-auto self-start rounded-3xl bg-accent px-6 py-2 font-semibold text-white no-underline shadow-accent transition-colors hover:bg-accent-hover"
							>
								Read More
							</a>
						</div>
						{post.thumbnail && (
							<div className="relative ml-6 flex min-h-[200px] w-80 items-stretch justify-center overflow-hidden rounded-r-2xl border-l border-surface-button bg-page-deep [&_img]:h-full [&_img]:w-full [&_img]:object-cover [&_img]:transition-transform [&_img]:duration-300 hover:[&_img]:scale-105">
								<Image src={post.thumbnail} alt={post.title} />
							</div>
						)}
					</div>
				))}
			</div>
			<div className="mt-10 text-center">
				<a
					href={data.externalLinks.blog}
					target="_blank"
					rel="noopener noreferrer"
					className="inline-flex items-center gap-2 rounded-3xl bg-surface-button px-9 py-3 text-lg font-semibold text-white no-underline transition-colors hover:bg-accent-hover before:content-['📝']"
				>
					View more blog
				</a>
			</div>
		</div>
	);
}

export default BlogSection;
