function CertificationSection() {
	const { PUBLIC_URL } = process.env;

	return (
		<div className="row blog-wrapper">
			<div className="col-md-4">
				<div className="blog-item rounded bg-dark shadow-light wow fadeIn">
					<a href="#small-dialog-aws-clc" className="work-content">
						<div className="thumb">
							<span className="category">AWS Certificate</span>
							<img
								src={`${PUBLIC_URL}/images/achieves/cert/AWS Certified Cloud Practitioner_banner.png`}
								alt="blog-title"
							/>
						</div>
						<div className="details">
							<h4 className="my-0 title">
								AWS Certified Cloud Practitioner
							</h4>
							<ul className="list-inline meta mb-0 mt-2">
								<li className="list-inline-item">05 October, 2021</li>
								<li className="list-inline-item">05 October, 2024</li>
							</ul>
						</div>
					</a>
					<div
						id="small-dialog-aws-clc"
						className="white-popup zoom-anim-dialog mfp-hide"
					>
						<img
							src={`${PUBLIC_URL}/images/achieves/cert/AWS Certified Cloud Practitioner.png`}
							alt="Title"
						/>
					</div>
				</div>
			</div>
			<div className="col-md-4">
				<div className="blog-item rounded bg-dark shadow-light wow fadeIn">
					<a href="#small-dialog-aws-saa" className="work-content">
						<div className="thumb">
							<span className="category">AWS Certificate</span>
							<img
								src={`${PUBLIC_URL}/images/achieves/cert/AWS Certified Solutions Architect - Associate_banner.png`}
								alt="blog-title"
							/>
						</div>
						<div className="details">
							<h4 className="my-0 title">
								AWS Certified Solutions Architect – Associate
							</h4>
							<ul className="list-inline meta mb-0 mt-2">
								<li className="list-inline-item">19 November, 2021</li>
								<li className="list-inline-item">19 November, 2024</li>
							</ul>
						</div>
					</a>
					<div
						id="small-dialog-aws-saa"
						className="white-popup zoom-anim-dialog mfp-hide"
					>
						<img
							src={`${PUBLIC_URL}/images/achieves/cert/AWS Certified Solutions Architect - Associate.png`}
							alt="Title"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CertificationSection;
