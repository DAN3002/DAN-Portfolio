import data from '../../data/data';
import Carousel from '../utils/Carousel';
import LazyImage from '../utils/LazyImage';

function CertificationSection() {
	const { certifications } = data;

	const items = certifications.map((cert, i) => (
		<div key={i} className="custem-carousel-item rounded bg-dark wow fadeIn">
			<a href={`#small-dialog-cert-${i}`} className="work-content" onClick={() => { if (typeof window.umami !== 'undefined') { window.umami.track(`open-cert-${cert.name}`); } }}>
				{/* Fixed-height (268px) thumbnail, badge centered & uncropped.
				    Migrated from the old .cert-thumb rule in lazy-image.css. */}
				<div className="thumb flex h-[268px] items-center justify-center p-5 [&_.lazy-load-image-wrapper]:flex [&_.lazy-load-image-wrapper]:h-full [&_.lazy-load-image-wrapper]:w-auto [&_.lazy-load-image-wrapper]:items-center [&_.lazy-load-image-wrapper]:justify-center [&_img]:h-full [&_img]:w-auto [&_img]:max-w-full [&_img]:object-contain">
					<span className="category">{cert.category}</span>
					<LazyImage
						src={cert.thumb}
						alt={cert.name}
						style={{
							width: 'auto',
							height: '100%',
							maxWidth: '100%',
							objectFit: 'contain',
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
						onClick={() => { if (typeof window.umami !== 'undefined') { window.umami.track(`view-cert-${cert.name}`); } }}
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
