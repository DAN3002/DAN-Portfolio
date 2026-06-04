import data from '../../data/data';
import LazyImage from '../utils/LazyImage';
import MediaCard from '../utils/MediaCard';

const track = (event) => {
	if (typeof window.umami !== 'undefined') window.umami.track(event);
};

function CertificationSection() {
	const { certifications } = data;

	return (
		<>
			{/* Full-width responsive grid (replaces the old slick carousel that was
			    constrained to max-width:1010px and rendered as a narrow centred column).
			    1 col (mobile) / 2 (sm) / 3 (xl) — matches the Projects/About width. */}
			<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
				{certifications.map((cert, i) => (
					<MediaCard
						key={cert.name}
						href={`#small-dialog-cert-${i}`}
						category={cert.category}
						title={cert.name}
						meta={[cert.start, cert.end]}
						thumb={cert.thumb}
						alt={cert.name}
						imageHeight={240}
						containImage
						onClick={() => track(`open-cert-${cert.name}`)}
					/>
				))}
			</div>

			{/* Magnific-popup dialogs (one per certificate) */}
			{certifications.map((cert, i) => (
				<div
					key={cert.name}
					id={`small-dialog-cert-${i}`}
					className="white-popup zoom-anim-dialog mfp-hide"
				>
					<LazyImage src={cert.image} alt={cert.name} />
					<br />
					<br />
					<a
						href={cert.url}
						className="btn btn-default"
						target="_blank"
						rel="noreferrer"
						onClick={() => track(`view-cert-${cert.name}`)}
					>
						Show Credential
					</a>
				</div>
			))}
		</>
	);
}

export default CertificationSection;
