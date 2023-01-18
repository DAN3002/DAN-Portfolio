import Section from './Section';
import HomeSection from './home/HomeSection';
import AboutSection from './about/AboutSection';
import ExperienceSection from './experience/ExperienceSection';
import WorkSection from './work/WorkSection';
import CertificationSection from './certification/CertificationSection';
import AchieveSection from './achieve/AchieveSection';
import ContactSection from './contact/ContactSection';

function Main() {
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
				title="Experience"
			>
				<ExperienceSection />
			</Section>

			<Section
				id="works"
				title="Works"
			>
				<WorkSection />
			</Section>

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
