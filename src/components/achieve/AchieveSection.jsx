function AchieveSection() {
	return (
		<div className="row blog-wrapper">
			<div className="col-md-4">
				<div className="blog-item rounded bg-dark shadow-light wow fadeIn">
					<a href="#small-dialog-hackathon-2019" className="work-content">
						<div className="thumb">
							<span className="category">Hackathon</span>
							<img
								src="images/achieves/hackathon-2019.jpg"
								alt="blog-title"
							/>
						</div>
						<div className="details">
							<h4 className="my-0 title">FPT Edu Hackathon 2019</h4>
							<ul className="list-inline meta mb-0 mt-2">
								<li className="list-inline-item">12 January, 2020</li>
								<li className="list-inline-item">Third Prize</li>
							</ul>
						</div>
					</a>
					<div
						id="small-dialog-hackathon-2019"
						className="white-popup zoom-anim-dialog mfp-hide"
					>
						<img
							src="images/achieves/hackathon-2019-banner.jpg"
							alt="Title"
						/>
						<p>
							Our team has achieved third prize with equipment to check
							the safety of the water.
						</p>
						<div style={{ marginLeft: 10 }}>
							<ul>
								<li>
									<a href="https://vnexpress.net/hoc-sinh-thpt-gianh-giai-fpt-edu-hackathon-2019-4042313.html">
										Học sinh THPT giành giải 'FPT Edu Hackathon' 2019
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div className="col-md-4">
				<div className="blog-item rounded bg-dark shadow-light wow fadeIn">
					<a href="#small-dialog-hackathon-2021" className="work-content">
						<div className="thumb">
							<span className="category">Hackathon</span>
							<img
								src="images/achieves/hackathon-2021.png"
								alt="blog-title"
							/>
						</div>
						<div className="details">
							<h4 className="my-0 title">FPT Edu Hackathon 2021</h4>
							<ul className="list-inline meta mb-0 mt-2">
								<li className="list-inline-item">18 April, 2021</li>
								<li className="list-inline-item">Third Prize</li>
							</ul>
						</div>
					</a>
					<div
						id="small-dialog-hackathon-2021"
						className="white-popup zoom-anim-dialog mfp-hide"
					>
						<img
							src="images/achieves/hackathon-2021-banner.jpg"
							alt="Title"
						/>
						<p />
						<div style={{ marginLeft: 10 }}>
							<ul>
								<li>
									<a href="https://vnexpress.net/4-hoc-sinh-lop-12-lam-san-pham-ai-ho-tro-dieu-tri-covid-19-4269038.html?fbclid=IwAR16uIHcQHmSkyvecoIT_z8IwSujveLDKXw7wImasg-5WxNR1Iym9cMJMh0">
										4 học sinh lớp 12 làm sản phẩm AI hỗ trợ điều trị
										Covid-19
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AchieveSection;
