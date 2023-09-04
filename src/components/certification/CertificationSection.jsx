import data from '../../data/data';
import Carousel from '../utils/Carousel';

function CertificationSection() {
	const { PUBLIC_URL } = process.env;
	const { certifications } = data;

	const items = certifications.map((cert, i) => (
		<div className="custem-carousel-item rounded bg-dark wow fadeIn">
			<a href={`#small-dialog-cert-${i}`} className="work-content">
				<div className="thumb">
					<span className="category">{cert.category}</span>
					<img
						src={`${PUBLIC_URL}${cert.thumb}`}
						alt={cert.name}
						style={{
							width: '330px',
							height: '173px',
						}}
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
					id={`small-dialog-cert-${i}`}
					className="white-popup zoom-anim-dialog mfp-hide"
				>
					<img
						src={`${PUBLIC_URL}${cert.image}`}
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

			<Carousel
				items={items}
			/>
		</div>
	);
}

export default CertificationSection;
