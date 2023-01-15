import Section from './Section';
import HomeSection from './home/HomeSection';
import AboutSection from './about/AboutSection';
import ExperienceSection from './experience/ExperienceSection';
import WorkSection from './work/WorkSection';
import CertificationSection from './certification/CertificationSection';
import AchieveSection from './achieve/AchieveSection';

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
				title="Work"
			>
				<WorkSection />
			</Section>

			<Section
				id="certifications"
				title="Certification"
			>
				<CertificationSection />
			</Section>

			<Section
				id="achieves"
				title="Achievement"
			>
				<AchieveSection />
			</Section>
		</main>
	);
}

export default Main;
