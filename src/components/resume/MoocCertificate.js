/* eslint-disable react/forbid-prop-types */
import moocCerts from '../../data/moocCerts';

function MoocCertificate() {
	return (
		<div id="mooc-certs">
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
							{/* Combine cert_id with index because a couple of source
							    entries share the same Udemy cert_id, which would
							    otherwise produce duplicate React keys. */}
							{moocCerts.map((item, index) => (
								<li key={`${item.cert_id}-${index}`}>
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
		</div>
	);
}

export default MoocCertificate;
