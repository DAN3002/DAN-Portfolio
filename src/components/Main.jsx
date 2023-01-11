import Section from './Section';
import HomeSection from './home/HomeSection';
import AboutSection from './about/AboutSection';
import ExperienceSection from './experience/ExperienceSection';
import WorkSection from './work/WorkSection';
import CertificationSection from './certification/CertificationSection';

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
				id="work"
				title="Work"
			>
				<WorkSection />
			</Section>

			<Section
				id="certification"
				title="Certification"
			>
				<CertificationSection />
			</Section>
		</main>
	);
}

export default Main;
