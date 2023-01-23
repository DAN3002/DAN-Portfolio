import data from '../../data/data';

function CertificationSection() {
	const { PUBLIC_URL } = process.env;
	const { certifications } = data;

	return (
		<div className="row blog-wrapper">
			{certifications.map((cert, i) => (
				<div className="col-md-4">
					<div className="blog-item rounded bg-dark shadow-light wow fadeIn">
						<a href={`#small-dialog-cert-${i}`} className="work-content">
							<div className="thumb">
								<span className="category">{cert.category}</span>
								<img
									src={`${PUBLIC_URL}${cert.thumb}`}
									alt="blog-title"
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
						<div
							id={`small-dialog-cert-${i}`}
							className="white-popup zoom-anim-dialog mfp-hide"
						>
							<img
								src={`${PUBLIC_URL}${cert.image}`}
								alt="Title"
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
					</div>
				</div>
			))}
		</div>
	);
}

export default CertificationSection;
