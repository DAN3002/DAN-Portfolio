import type { ImageMetadata } from 'astro';
import { asset } from '~/lib/assets';

export interface Award {
	slug: string;
	name: string;
	prize: string;
	date: string;
	image: ImageMetadata;
	/** One-line summary shown on the card. */
	text: string;
	/** Longer write-up shown in the popup, one paragraph or bullet per item. */
	details: string[];
	/** Project on this site built for the award, opened from the popup. */
	project?: string;
	press: { text: string; url: string }[];
}

export const awards: Award[] = [
	{
		slug: 'hack-cx-2025',
		name: 'Hack CX Together 2025',
		prize: 'Runner-up',
		date: 'Jun 2025',
		image: asset('awards/hack-cx-together-2025-banner.jpg'),
		text: 'Real-time AI likelihood engine that personalises banking product recommendations across every channel.',
		details: [
			'Built a real-time AI likelihood engine that predicts which banking product each customer is most likely to want, from their behaviour across every channel.',
			'It automates data collection, feature selection, model training and deployment, to raise conversion, reduce compliance risk and keep engagement up across all banking segments.',
		],
		project: 'likelihood-engine',
		press: [],
	},
	{
		slug: 'nrc-fpt-2024',
		name: 'NRC x FPT Hackathon 2024',
		prize: 'Runner-up',
		date: 'Nov 2024',
		image: asset('awards/nrc-hackathon.jpg'),
		text: 'AI pipeline that acts as a virtual data analyst for hospital patient and staff data.',
		details: [
			'An AI system that works like a virtual data analyst for hospitals: it finds issues, pulls out insights and suggests actions.',
			'It analyses patient data and staff feedback, detects unusual trends, charts patterns and summarises open-text answers.',
			'Staff ask questions in plain language and get back answers, charts or the query that produced them.',
		],
		project: 'hospital-insight-pipeline',
		press: [],
	},
	{
		slug: 'vpbank-2024',
		name: 'VPBank Hackathon 2024',
		prize: 'Champion',
		date: 'Jun 2024',
		image: asset('awards/vpbank-hackathon-2024-banner.jpg'),
		text: 'GPT-4 architecture design generator. Beat over 150 teams from companies and universities.',
		details: [
			'Built an architecture design generator: describe a system in plain words and GPT-4 drafts an editable cloud architecture diagram, which you refine through chat.',
			'Beat over 150 teams from companies and universities.',
		],
		project: 'architecture-design-generator',
		press: [],
	},
	{
		slug: 'resfes-2023',
		name: 'FPT Edu ResFes 2023',
		prize: 'Third prize',
		date: 'Aug 2023',
		image: asset('awards/resfes-2023-banner.jpg'),
		text: 'Image retrieval for fashion e-commerce with the Relahash model, fed by a declarative crawler over 7.5M+ images on Kubernetes.',
		details: [
			'Built an ecosystem around the Relahash model for fast, accurate image retrieval in fashion e-commerce.',
			'Designed a declarative crawler: users describe what they need and the system does the heavy lifting.',
			'Collected a dataset of 7.5M+ images from 8K+ shops across 30 websites.',
			'Ran the crawler and the AI pipeline together on Kubernetes.',
		],
		project: 'ecommerce-template-crawler',
		press: [],
	},
	{
		slug: 'funix-chatgpt-2023',
		name: 'FUNiX ChatGPT Hackathon',
		prize: 'Champion',
		date: 'May 2023',
		image: asset('awards/funix-chatgpt-hackathon-banner.jpg'),
		text: 'FinAInce Assistant, a fintech chatbot that takes actions for the user, built in under a month.',
		details: [
			"Won first place with FinAInce Assistant, 'ChatGPT that can take actions': a fintech chatbot built in under a month.",
			'Beyond answering questions, it carries out finance tasks for the user, showing how far ChatGPT can go past plain Q&A.',
		],
		project: 'finaince-assistant',
		press: [
			{ text: 'VnExpress: banking assistant wins ChatGPT Hackathon', url: 'https://vnexpress.net/du-an-tro-ly-ao-ngan-hang-gianh-quan-quan-chatgpt-hackathon-4603011.html' },
			{ text: 'VnExpress: FUNiX students on the winning project', url: 'https://vnexpress.net/sinh-vien-funix-chia-se-ve-du-an-vo-dich-chatgpt-hackathon-4604055.html' },
		],
	},
	{
		slug: 'fpt-edu-2021',
		name: 'FPT Edu Hackathon 2021',
		prize: 'Third prize',
		date: 'Apr 2021',
		image: asset('awards/hackathon-2021-banner.jpg'),
		text: 'Youngest team in the event. AI web app that helps doctors diagnose COVID-19; 104 university teams competed.',
		details: [
			'The youngest team in the competition, still in high school.',
			'Won third prize among 104 university teams with a web app that uses AI to help doctors diagnose COVID-19.',
		],
		project: 'doctors-cyclop',
		press: [{ text: 'VnExpress: 4 high-schoolers build AI for COVID-19 care', url: 'https://vnexpress.net/4-hoc-sinh-lop-12-lam-san-pham-ai-ho-tro-dieu-tri-covid-19-4269038.html' }],
	},
	{
		slug: 'fpt-edu-2019',
		name: 'FPT Edu Hackathon 2019',
		prize: 'Third prize',
		date: 'Jan 2020',
		image: asset('awards/hackathon-2019-banner.jpg'),
		text: 'Youngest team in the event. Portable device that checks whether water is safe; 35 teams competed.',
		details: [
			'The youngest team in the competition, still in high school.',
			'Won third prize among 35 university teams with a portable device that checks whether water is safe to use.',
		],
		project: 'water-testing',
		press: [{ text: 'VnExpress: high-schoolers win at FPT Edu Hackathon 2019', url: 'https://vnexpress.net/hoc-sinh-thpt-gianh-giai-fpt-edu-hackathon-2019-4042313.html' }],
	},
];

export const certifications = [
	{
		name: 'AWS Certified Solutions Architect – Associate',
		issued: 'Nov 2021',
		image: asset('certs/aws-saa-thumb.png'),
		url: 'https://www.credly.com/badges/8c2432fa-b400-4ecf-ab18-783351e6128b',
	},
	{
		name: 'AWS Certified Cloud Practitioner',
		issued: 'Oct 2021',
		image: asset('certs/aws-ccp-thumb.png'),
		url: 'https://www.credly.com/badges/1f3d4dc4-c239-4003-a9c6-f0ee578bc31d',
	},
	{
		name: 'AWS Academy Certified Educator',
		issued: 'Oct 2021',
		image: asset('certs/aws-educator.png'),
		url: 'https://www.credly.com/badges/7b48e869-5319-4d9f-ae19-9ca358c1842e',
	},
] as const;

// Udemy course certificates, grouped by topic so the list is scannable.
const udemy = (id: string) => `https://www.udemy.com/certificate/${id}/`;
export const courses = [
	{
		topic: 'Kubernetes & containers',
		items: [
			{ name: 'Certified Kubernetes Administrator (CKA)', url: udemy('UC-6f2299bd-dda2-44d5-bfbf-5f732aff4919') },
			{ name: 'Kubernetes Certified Application Developer (CKAD)', url: udemy('UC-a376ac99-191e-464d-96b1-98c075cac509') },
			{ name: 'Kubernetes for the Absolute Beginners', url: udemy('UC-4f80e09c-e905-4b0b-aba3-5af00fe72105') },
			{ name: 'Docker Mastery: with Kubernetes + Swarm', url: udemy('UC-ab424da9-229a-402f-9865-a6097f80899a') },
			{ name: 'OpenShift for the Absolute Beginners', url: udemy('UC-19618edd-aea1-4c7f-af09-d3fefa1924bf') },
		],
	},
	{
		topic: 'Cloud, CI/CD & observability',
		items: [
			{ name: 'AWS Certified SysOps Administrator Associate (SOA-C02)', url: udemy('UC-9b39463d-3789-4ef7-921a-093fc6977a00') },
			{ name: 'Argo CD Essential Guide for End Users', url: udemy('UC-e1f3c366-9bd9-4a85-990d-65669a6b0759') },
			{ name: 'Jenkins: Jobs, Pipelines, CI/CD and DevOps', url: udemy('UC-bbe7eaba-dda8-46f1-8db5-1e8d29a9b4ba') },
			{ name: 'Observability with Grafana, Prometheus, Loki, Alloy and Tempo', url: udemy('UC-d678c266-6365-45f6-9e89-6f5742980a02') },
			{ name: 'Complete Guide to Elasticsearch', url: udemy('UC-a12fea83-86c1-49b4-a404-cc17afe9ea84') },
			{ name: 'Data Processing with Logstash (and Filebeat)', url: udemy('UC-c8af7a8c-cd12-43e3-92fb-f28784ff661b') },
			{ name: 'Data Visualization with Kibana', url: udemy('UC-76e1e2c4-2195-46d2-b8c9-7c8b1a261591') },
		],
	},
	{
		topic: 'Data engineering',
		items: [
			{ name: 'Apache Airflow: The Hands-On Guide', url: udemy('UC-0dff06f7-9613-4158-b106-e2719b821b32') },
			{ name: 'Apache Spark 3 – Real-time Stream Processing using Python', url: udemy('UC-33cc5ad0-b574-41d0-b073-9461a1a144ce') },
			{ name: 'Data Warehouse Fundamentals for Beginners', url: udemy('UC-ef60d63f-7e59-42dd-a77e-d0a8fa8191df') },
			{ name: 'Modern Web Scraping with Python', url: udemy('UC-d3f18462-fc15-41f4-9aaa-4cf6be427de4') },
		],
	},
	{
		topic: 'Software & architecture',
		items: [
			{ name: 'Event Driven Microservices with CQRS, Saga, Event Sourcing', url: udemy('UC-4ebccbee-9b42-4dd6-b492-3082460cb0b2') },
			{ name: 'LangChain in Action: LLM-Powered Applications', url: udemy('UC-f4550731-8673-4d08-9601-7b6c7e896fe6') },
			{ name: 'NodeJS – The Complete Guide', url: udemy('UC-33cc5ad0-b574-41d0-b073-9461a1a144ce') },
			{ name: 'MongoDB – The Complete Developer\'s Guide', url: udemy('UC-9900f262-8440-486a-a4d6-d08d29d293fc') },
			{ name: 'The Ultimate React Course 2024', url: udemy('UC-9cdc31ec-ad4d-4c9d-9525-daf2ea62eb8a') },
			{ name: 'Build Responsive Real-World Websites with HTML and CSS', url: udemy('UC-ba1c5b09-f3c6-43ed-b2d8-d488a8c83552') },
		],
	},
] as const;
