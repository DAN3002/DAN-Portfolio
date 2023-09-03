import { useEffect } from 'react';

import Section from './Section';
import HomeSection from './home/HomeSection';
import AboutSection from './about/AboutSection';
import ResumeSection from './resume/ResumeSection';
// import WorkSection from './work/WorkSection';
import CertificationSection from './certification/CertificationSection';
import AchieveSection from './achieve/AchieveSection';
import ContactSection from './contact/ContactSection';

function Main() {
	useEffect(() => {
		$('.carousel-wrapper').slick({
			dots: true,
			arrows: false,
			speed: 200,
			slidesToShow: 3,
			slidesToScroll: 3,
			infinite: true,
			autoplay: true,
			autoplaySpeed: 3000,
		});
	}, []);

	return (
		<main className="content">
			<HomeSection />
			<Section
				id="about"
				title="About Me"
			>
				<AboutSection />
			</Section>
			<Section
				id="experience"
				title="Resume"
			>
				<ResumeSection />
			</Section>

			{/* <Section
				id="works"
				title="Works"
			>
				<WorkSection />
			</Section> */}

			<Section
				id="certifications"
				title="Certifications"
			>
				<CertificationSection />
			</Section>

			<Section
				id="achieves"
				title="Achievements"
			>
				<AchieveSection />
			</Section>
			<Section
				id="contact"
				title="Get In Touch"
			>
				<ContactSection />
			</Section>

			<div className="spacer" data-height={96} />
		</main>
	);
}

export default Main;
