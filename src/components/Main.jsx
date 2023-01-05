import Section from './Section';
import HomeSection from './home/HomeSection';
import AboutSection from './about/AboutSection';

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
		</main>
	);
}

export default Main;
