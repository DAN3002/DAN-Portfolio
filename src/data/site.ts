import { asset } from '~/lib/assets';

export const site = {
	name: 'Nguyễn Đình Anh',
	handle: 'DAN3002',
	url: 'https://dan3002.id.vn',
	email: 'dan3002.work@gmail.com',
	location: 'Hà Nội, Việt Nam',
	resume: '/Resume_Nguyễn Đình Anh.pdf',
	title: 'Nguyễn Đình Anh — DevOps & Software Engineer',
	description:
		'DevOps and software engineer building the platform behind Drylab, an AI system for biomedical research. Previously the youngest Senior Specialist at VPBank and an AWS Authorized Instructor.',
	// Year the first job started; used for the "years building software" stat.
	careerStart: new Date('2019-08-01'),
	profile: asset('profile.png'),
	socials: [
		{ label: 'GitHub', href: 'https://github.com/DAN3002', icon: 'simple-icons:github' },
		{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/dan3002/', icon: 'simple-icons:linkedin' },
		// Facebook dropped on purpose: personal profile, not useful for hiring.
	],
} as const;

export const nav = [
	{ id: 'now', label: 'Now' },
	{ id: 'experience', label: 'Experience' },
	{ id: 'projects', label: 'Projects' },
	{ id: 'awards', label: 'Awards' },
	{ id: 'credentials', label: 'Credentials' },
	{ id: 'contact', label: 'Contact' },
] as const;

export const skills = [
	{ group: 'Languages', items: ['JavaScript / TypeScript', 'Python', 'Go', 'Bash', 'SQL'] },
	{ group: 'Frameworks', items: ['React', 'Next.js', 'Node.js', 'Django', 'MERN stack'] },
	{ group: 'Platform', items: ['AWS', 'Kubernetes', 'Docker', 'GitOps / Argo CD', 'Grafana stack', 'IBM MQ'] },
] as const;
