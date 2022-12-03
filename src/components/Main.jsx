import Section from './Section';
import HomeSection from './home/Home';
import AboutSection from './about/AboutSection';

function Main() {
	return (
		<main className="content">
			<HomeSection />
			<Section
				title="About Me"
			>
				<AboutSection />
			</Section>
		</main>
	);
}

export default Main;
