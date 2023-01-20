// import React, { useContext } from 'react';

import ScollDown from './ScollDown';
import Parallax from './Parallax';

// import { DataContext } from '../../context/DataContext';

import data from '../../data/data.json';

function HomeSection() {
	const { PUBLIC_URL } = process.env;

	const { home = {} } = data;
	return (
		<section id="home" className="home d-flex align-items-center">
			<div className="container">
				<div className="intro">
					<img
						src={`${PUBLIC_URL}/images/dan3002/avatar.png`}
						alt="Avatar"
						className="mb-4"
					/>
					<h1 className="mb-2 mt-0">Nguyễn Đình Anh</h1>
					<span>
						<span>I'm a </span>
						<span className="text-rotating">
							{(home.roles || []).join(', ')}
						</span>
					</span>
					<ul className="social-icons light list-inline mb-0 mt-4">
						<li className="list-inline-item">
							<a href="https://github.com/DAN3002" target="_blank" rel="noreferrer">
								<i className="fab fa-github" />
							</a>
						</li>
						<li className="list-inline-item">
							<a
								href="https://www.facebook.com/dan3002/"
								target="_blank"
								rel="noreferrer"
							>
								<i className="fab fa-facebook" />
							</a>
						</li>
						<li className="list-inline-item">
							<a
								href="https://www.linkedin.com/in/dan3002/"
								target="_blank"
								rel="noreferrer"
							>
								<i className="fab fa-linkedin" />
							</a>
						</li>
						<li className="list-inline-item">
							<a href="mailto:dinhanh300229@gmail.com" target="_blank" rel="noreferrer">
								<i className="fab fa-google" />
							</a>
						</li>
					</ul>
					<div className="mt-4">
						<a href="#contact" className="btn btn-default">
							Contact me
						</a>
					</div>
				</div>
				<ScollDown />
				<Parallax />
			</div>
		</section>
	);
}

export default HomeSection;
