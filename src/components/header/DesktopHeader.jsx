import { useEffect, useState } from 'react';

import { getLatestCommitDate } from '../../data/github';
import { track, Events } from '../../lib/analytics';

function DesktopHeader() {
	const [lastUpdated, setLastUpdated] = useState('');

	useEffect(() => {
		getLatestCommitDate().then((date) => {
			// Format: Month Year
			setLastUpdated(`${date.toLocaleString('en-us', { month: 'long' })} ${date.getFullYear()}`);
		});
	}, []);

	return (
		<header className="desktop-header-1 d-flex align-items-start flex-column">
			{/* logo image */}
			<div className="site-logo">
				<a href="index.html">
					<h2>D.A.N_3002</h2>
				</a>
			</div>
			{/* main menu */}
			<nav>
				<ul className="vertical-menu scrollspy">
					<li className="active">
						<a href="#home" onClick={() => track(Events.NAV, { section: 'home' })}>
							<i className="icon-home" />
							Home
						</a>
					</li>
					<li>
						<a href="#about" onClick={() => track(Events.NAV, { section: 'about' })}>
							<i className="icon-user-following" />
							About
						</a>
					</li>
					<li>
						<a href="#experience" onClick={() => track(Events.NAV, { section: 'experience' })}>
							<i className="icon-graduation" />
							Resume
						</a>
					</li>
					<li>
						<a href="#projects" onClick={() => track(Events.NAV, { section: 'projects' })}>
							<i className="icon-folder" />
							Projects
						</a>
					</li>
					{/* <li>
						<a
							href="#blog"
							onClick={() => track(Events.NAV, { section: 'blog' })}
						>
							<i className="icon-globe" />
							Blog
						</a>
					</li> */}
					<li>
						<a href="#certifications" onClick={() => track(Events.NAV, { section: 'certifications' })}>
							<i className="icon-check" />
							Certifications
						</a>
					</li>
					<li>
						<a href="#achieves" onClick={() => track(Events.NAV, { section: 'achieves' })}>
							<i className="icon-note" />
							Achieves
						</a>
					</li>
					<li>
						<a href="#contact" onClick={() => track(Events.NAV, { section: 'contact' })}>
							<i className="icon-bubbles" />
							Contact
						</a>
					</li>
				</ul>
			</nav>
			{/* site footer */}
			<div className="footer">
				{/* copyright text */}
				<span className="copyright">
					©
					{' '}
					{new Date().getFullYear()}
					{' '}
					<b>Nguyễn Đình Anh</b>
					.
				</span>
				<br />
				<span className="copyright">
					Last Updated:
					{' '}
					{ lastUpdated }
				</span>
			</div>
		</header>
	);
}

export default DesktopHeader;
