import data from '../../data/data';
import Carousel from '../utils/Carousel';
import LazyImage from '../utils/LazyImage';

function CertificationSection() {
	const { certifications } = data;

	const items = certifications.map((cert, i) => (
		<div key={i} className="custem-carousel-item rounded bg-dark wow fadeIn">
			<a href={`#small-dialog-cert-${i}`} className="work-content">
				<div className="thumb">
					<span className="category">{cert.category}</span>
					<LazyImage
						src={cert.thumb}
						alt={cert.name}
						width={330}
						height={173}
					/>
				</div>
				<div className="details">
					<h4 className="my-0 title">
						{cert.name}
					</h4>
					<ul className="list-inline meta mb-0 mt-2">
						<li className="list-inline-item">{cert.start}</li>
						<li className="list-inline-item">{cert.end}</li>
					</ul>
				</div>
			</a>
		</div>
	));

	return (
		<div className="row blog-wrapper">
			{certifications.map((cert, i) => (
				<div
					key={i}
					id={`small-dialog-cert-${i}`}
					className="white-popup zoom-anim-dialog mfp-hide"
				>
					<LazyImage
						src={cert.image}
						alt={cert.name}
					/>
					<br />
					<br />
					<a
						href={cert.url}
						className="btn btn-default"
						target="_blank"
						rel="noreferrer"
					>
						Show Credential
					</a>
				</div>
			))}

			<Carousel items={items} />
		</div>
	);
}

export default CertificationSection;
