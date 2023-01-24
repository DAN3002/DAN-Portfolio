import parse from 'html-react-parser';

import data from '../../data/data';

function AchieveSection() {
	const { PUBLIC_URL } = process.env;

	const { achievements } = data;

	return (
		<div className="row blog-wrapper">
			{achievements.map((item, index) => (
				<div className="col-md-4">
					<div className="blog-item rounded bg-dark shadow-light wow fadeIn">
						<a
							href={`#small-dialog-achieve-${index}`}
							className="work-content"
						>
							<div className="thumb">
								<span className="category">{item.category}</span>
								<img
									src={`${PUBLIC_URL}${item.thumb}`}
									alt="blog-title"
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
						<div
							id={`small-dialog-achieve-${index}`}
							className="white-popup zoom-anim-dialog mfp-hide"
						>
							<img
								src={`${PUBLIC_URL}${item.image}`}
								alt="Title"
							/>
							<div className="spacer" data-height={5} />
							{item.text.map((text) => (
								<p>{parse(text)}</p>
							))}

							<div className="spacer" data-height={10} />
							<div style={{ marginLeft: 10 }}>
								<ul>
									{item.link.map((el) => (
										<li>
											<a href={el.url}>
												{el.text}
											</a>
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

export default AchieveSection;
