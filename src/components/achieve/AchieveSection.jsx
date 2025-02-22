import parse from 'html-react-parser';
import data from '../../data/data';
import Carousel from '../utils/Carousel';
import LazyImage from '../utils/LazyImage';

function AchieveSection() {
	const { achievements } = data;

	const items = achievements.map((item, index) => (
		<div key={index} className="custem-carousel-item rounded bg-dark wow fadeIn">
			<a
				href={`#small-dialog-achieve-${index}`}
				className="work-content"
			>
				<div className="thumb">
					<span className="category">{item.category}</span>
					<LazyImage
						src={item.thumb}
						alt={item.name}
						width={330}
						height={268}
					/>
				</div>
				<div className="details">
					<h4 className="my-0 title">{item.name}</h4>
					<ul className="list-inline meta mb-0 mt-2">
						<li className="list-inline-item">
							{item.date}
						</li>
						<li className="list-inline-item">{item.prize}</li>
					</ul>
				</div>
			</a>
		</div>
	));

	return (
		<div className="row blog-wrapper">
			{achievements.map((item, index) => (
				<div
					key={index}
					id={`small-dialog-achieve-${index}`}
					className="white-popup zoom-anim-dialog mfp-hide"
				>
					<LazyImage
						src={item.image}
						alt={item.name}
					/>
					<div className="spacer" data-height={5} />
					{item.text.map((text, i) => (
						<p key={i}>{parse(text)}</p>
					))}

					<div className="spacer" data-height={10} />
					<div style={{ marginLeft: 10 }}>
						<ul>
							{item.link.map((el, i) => (
								<li key={i}>
									<a href={el.url}>
										{el.text}
									</a>
								</li>
							))}
						</ul>
					</div>
				</div>
			))}
			<Carousel items={items} />
		</div>
	);
}

export default AchieveSection;
