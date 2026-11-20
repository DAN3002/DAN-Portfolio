import type { ImageMetadata } from 'astro';
import { asset } from '~/lib/assets';

export const projectTags = ['AI', 'Fullstack', 'DevOps', 'Crawler'] as const;
export type ProjectTag = (typeof projectTags)[number];

export interface Project {
	slug: string;
	title: string;
	summary: string;
	role: string;
	tags: ProjectTag[];
	techs: string[];
	/** Prize or headline result, shown as a badge on the card. */
	award?: string;
	/** Detail bullets; may contain <b>. */
	details: string[];
	source?: string;
	images: ImageMetadata[];
	featured?: boolean;
}

const tcb = [2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => asset(`projects/tcb-hackathon/tcb-hackathon-project-${n}.png`));

export const projects: Project[] = [
	{
		slug: 'likelihood-engine',
		title: 'Real-time likelihood engine for financial products',
		summary: 'AI engine that predicts which banking product each customer is likely to want, from behaviour across every channel.',
		role: 'Full-stack & DevOps engineer',
		tags: ['AI', 'Fullstack'],
		techs: ['React', 'Go', 'AWS', 'PostgreSQL', 'LangChain'],
		award: 'Runner-up · Hack CX Together 2025',
		details: [
			'Real-time customer propensity prediction and personalised product recommendations.',
			'Automated data collection, feature selection, model training and deployment.',
			'Scalable data pipeline with MLOps for continuous optimisation.',
		],
		images: tcb,
		featured: true,
	},
	{
		slug: 'architecture-design-generator',
		title: 'Architecture design generator',
		summary: 'Describe a system in plain words and get an editable cloud architecture diagram, powered by GPT-4.',
		role: 'Full-stack & DevOps engineer',
		tags: ['AI', 'Fullstack'],
		techs: ['React', 'LangChain', 'Go', 'AWS'],
		award: 'Champion · VPBank Hackathon 2024',
		details: [
			'Create an architecture design from scratch through an interactive chat.',
			'Beat over 150 teams from companies and universities.',
		],
		images: [asset('projects/architecture-design-generator.png')],
		featured: true,
	},
	{
		slug: 'hospital-insight-pipeline',
		title: 'Autonomous insight pipeline for hospital data',
		summary: 'A virtual data analyst that finds anomalies in patient and staff data and answers questions with charts.',
		role: 'Full-stack & DevOps engineer',
		tags: ['AI', 'Fullstack'],
		techs: ['React', 'LangChain', 'Go', 'PostgreSQL', 'MongoDB'],
		award: 'Runner-up · NRC x FPT Hackathon 2024',
		details: [
			'Detects unusual trends, visualises patterns and summarises open-text feedback.',
			'Staff ask questions in natural language; the system generates the query, the answer and the chart.',
		],
		images: [asset('projects/nrc-hackathon.png')],
		featured: true,
	},
	{
		slug: 'finaince-assistant',
		title: 'FinAInce Assistant',
		summary: 'A banking chatbot that takes actions for the user, not just answers: it predicts needs and automates routine tasks.',
		role: 'Full-stack & DevOps engineer',
		tags: ['AI', 'Fullstack'],
		techs: ['React', 'Flask', 'GCP', 'Firebase', 'OpenAI'],
		award: 'Champion · FUNiX ChatGPT Hackathon 2023',
		details: ['Predicts user behaviour, automates basic tasks and gives real-time financial insights.'],
		images: [asset('projects/finaince-assistant.png')],
	},
	{
		slug: 'cloudflare-cors-proxy',
		title: 'Cloudflare CORS proxy',
		summary: 'A small, fast CORS proxy on Cloudflare Workers with origin allow-lists and URL block-lists.',
		role: 'DevOps engineer',
		tags: ['DevOps'],
		techs: ['JavaScript', 'Cloudflare Workers'],
		details: [
			'Every HTTP method, custom headers and body via x-cors-* headers, and method override.',
			'Origin allow-listing, URL block-listing and automatic preflight handling.',
		],
		source: 'https://github.com/DAN3002/cloudflare-cors-proxy',
		images: [],
	},
	{
		slug: 'js-codefest-2024',
		title: 'JS Codefest 2024',
		summary: 'Real-time coding competition where players program bots to battle, collect items and outplay opponents.',
		role: 'Tech lead',
		tags: ['Fullstack', 'DevOps'],
		techs: ['Node.js', 'Socket.IO', 'AWS', 'Docker'],
		details: [
			'Led the build as tech lead across every milestone.',
			'Designed the deployment strategy and system architecture for launch.',
			'Ran code reviews and mentored the team.',
		],
		images: [asset('projects/js-codefest-2024.png')],
	},
	{
		slug: 'js-recruitment',
		title: 'JS Recruitment',
		summary: 'Recruitment app for JS Club: candidate sign-up, custom surveys and interview shifts in one place.',
		role: 'Tech lead',
		tags: ['Fullstack'],
		techs: ['React', 'Supabase', 'Cloudflare'],
		details: [
			'Customisable surveys for candidates at registration.',
			'Recruitment events with multiple interview shifts.',
		],
		images: [asset('projects/js-recruitment.png')],
	},
	{
		slug: 'youtube-colab-proxy',
		title: 'YouTube Colab proxy',
		summary: 'Python YouTube streaming proxy with a built-in web player that runs inside Google Colab.',
		role: 'Full-stack engineer',
		tags: ['Fullstack', 'DevOps'],
		techs: ['Python'],
		details: [
			'Proxied streaming up to 720p with range requests for seeking.',
			'Keyword search, playlists and channels with pagination.',
			'Password protection, cookies, geo-bypass and proxy settings.',
		],
		source: 'https://github.com/DAN3002/Youtube-Colab-Proxy',
		images: [],
	},
	{
		slug: 'notion-calendar-restyle',
		title: 'Notion Calendar restyle',
		summary: 'Chrome extension that brings Google Calendar\'s visual cues to Notion Calendar.',
		role: 'Front-end engineer',
		tags: ['Fullstack'],
		techs: ['JavaScript', 'Chrome extension'],
		details: [
			'Event background matches its ribbon colour.',
			'Distinct task styling; completed tasks are struck through.',
			'Past events are dimmed to cut visual noise.',
		],
		source: 'https://github.com/DAN3002/Notion-Calendar-Restyle',
		images: [],
	},
	{
		slug: 'ecommerce-template-crawler',
		title: 'Template-based e-commerce crawler',
		summary: 'Point it at one sample product page and it crawls every similar product on the site, kept up to date.',
		role: 'Full-stack & data engineer',
		tags: ['Crawler', 'Fullstack'],
		techs: ['Selenium', 'React', 'Node.js', 'Python'],
		award: 'Third prize · FPT Edu ResFes 2023',
		details: [
			'<b>End to end</b>: a template builder, a web app for crawled data and history, and a dynamic crawler core.',
			'Built a dataset of 7.5M+ images from 8K+ shops across 30 sites, on Kubernetes.',
		],
		images: [],
	},
	{
		slug: 'shopee-crawler',
		title: 'Shopee product crawler',
		summary: 'Crawls Shopee by shop or keyword, with continuous updates, for search, analytics and AI training data.',
		role: 'Data engineer',
		tags: ['Crawler'],
		techs: ['Python', 'Selenium'],
		details: ['Collected 1M fashion products and 8M images from over 8,000 shops.'],
		images: [],
	},
	{
		slug: 'imdb-crawler',
		title: 'IMDb crawler',
		summary: 'Collects movie details, reviews and ratings from IMDb with GraphQL and scraping, using IMDb-style filters.',
		role: 'Data engineer',
		tags: ['Crawler'],
		techs: ['Python', 'GraphQL', 'Selenium'],
		details: ['Filter by genre, rating, release year and more.', 'Full user-review collection.'],
		source: 'https://github.com/DAN3002/IMDb-Crawler',
		images: [],
	},
	{
		slug: 'tiktok-crawler',
		title: 'TikTok video crawler',
		summary: 'Downloads TikTok videos by hashtag or by sound.',
		role: 'Data engineer',
		tags: ['Crawler'],
		techs: ['Python'],
		details: ['Resolves video URLs through the TikTok API, then downloads them.'],
		source: 'https://github.com/DAN3002/Tiktok-Crawler',
		images: [],
	},
	{
		slug: 'funix-lms',
		title: 'FUNiX Learning Management System',
		summary: 'Course platform for FUNiX students and instructors, built on Open edX.',
		role: 'Full-stack developer & team lead',
		tags: ['Fullstack'],
		techs: ['React', 'Django', 'MySQL', 'AWS'],
		details: ['Course management, learning materials and student–instructor interaction.'],
		images: [asset('projects/funix-lms.png')],
	},
	{
		slug: 'funix-mentoring',
		title: 'FUNiX Mentoring System (HF40)',
		summary: 'Lets FUNiX students find a mentor and talk to them, built on Rocket.Chat.',
		role: 'Full-stack developer & team lead',
		tags: ['Fullstack'],
		techs: ['Meteor', 'MongoDB', 'GCP'],
		details: ['Built and maintained the matching and communication features.'],
		images: [asset('projects/funix-mentoring.png')],
	},
	{
		slug: 'doctors-cyclop',
		title: 'Doctor\'s Cyclop',
		summary: 'Web app that checks whether tubes are present and correctly placed on chest X-rays.',
		role: 'Full-stack & DevOps engineer',
		tags: ['AI', 'Fullstack'],
		techs: ['Meteor', 'MongoDB', 'AWS'],
		award: 'Third prize · FPT Edu Hackathon 2021',
		details: ['Built by four high-school students; beat over 100 university teams.'],
		source: 'https://github.com/DAN3002/Doctors-Cyclop-Webapp',
		images: [asset('projects/doctors-cyclop.png')],
	},
	{
		slug: 'funix-passport',
		title: 'FUNiX Passport',
		summary: 'Chrome extension that translates Udemy and Coursera subtitles and pages into Vietnamese.',
		role: 'Full-stack developer',
		tags: ['Fullstack'],
		techs: ['JavaScript', 'Firebase', 'Chrome extension'],
		details: ['Made MOOC platforms accessible to Vietnamese students.'],
		images: [asset('projects/funix-passport.png')],
	},
	{
		slug: 'water-testing',
		title: 'Water Testing Instant',
		summary: 'Hand-sized device that measures water turbidity and purity, with an Android app and cloud backend.',
		role: 'Backend & cloud engineer',
		tags: ['Fullstack'],
		techs: ['Express', 'Firebase'],
		award: 'Third prize · FPT Edu Hackathon 2019',
		details: ['Built the Express backend and real-time Firebase services.'],
		images: [],
	},
];
