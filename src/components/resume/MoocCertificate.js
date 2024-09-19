/* eslint-disable react/forbid-prop-types */
import moocCerts from '../../data/moocCerts';

function MoocCertificate() {
	return (
		<>
			<h3>MOOC Certs</h3>
			<div className="timeline star bg-dark rounded shadow-light padding-30 overflow-hidden">
				<div
					className="spacer d-md-none d-lg-none"
					data-height={30}
				/>
				<div className="timeline-container wow fadeInUp">
					<div className="content">
						<span className="time" />
						<ul>
							{moocCerts.map((item) => (
								<li key={item.cert_id}>
									<a
										className="cert-mooc-item"
										href={`https://www.udemy.com/certificate/${item.cert_id}/`}
										target="_blank"
										rel="noreferrer"
										title={`Skills: ${item.skills.join(', ')}`}
									>
										{item.name}
									</a>
								</li>
							))}
						</ul>
					</div>
				</div>
				<span className="line" />
			</div>
		</>
	);
}

export default MoocCertificate;
