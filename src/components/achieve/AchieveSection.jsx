import parse from 'html-react-parser';
import data from '../../data/data';
import LazyImage from '../utils/LazyImage';
import MediaCard from '../utils/MediaCard';

const track = (event) => {
	if (typeof window.umami !== 'undefined') window.umami.track(event);
};

function AchieveSection() {
	const { achievements } = data;

	return (
		<>
			{/* Full-width responsive grid (replaces the old slick carousel). Spans the
			    full container width, 3 across on desktop, with equal-height cards. */}
			<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
				{achievements.map((item, index) => (
					<MediaCard
						key={item.name}
						href={`#small-dialog-achieve-${index}`}
						category={item.category}
						title={item.name}
						meta={[item.date, item.prize]}
						thumb={item.thumb}
						alt={item.name}
						imageHeight={200}
						onClick={() => track(`open-achieve-${item.name}`)}
					/>
				))}
			</div>

			{/* Magnific-popup dialogs (one per achievement) */}
			{achievements.map((item, index) => (
				<div
					key={item.name}
					id={`small-dialog-achieve-${index}`}
					className="white-popup zoom-anim-dialog mfp-hide"
				>
					<LazyImage src={item.image} alt={item.name} />
					<div className="spacer" data-height={5} />
					{item.text.map((text) => (
						<p key={text}>{parse(text)}</p>
					))}

					<div className="spacer" data-height={10} />
					{item.link.length > 0 && (
						<div style={{ marginLeft: 10 }}>
							<ul>
								{item.link.map((el) => (
									<li key={el.url}>
										<a
											href={el.url}
											onClick={() => track(`view-achieve-link-${item.name}`)}
										>
											{el.text}
										</a>
									</li>
								))}
							</ul>
						</div>
					)}
				</div>
			))}
		</>
	);
}

export default AchieveSection;
