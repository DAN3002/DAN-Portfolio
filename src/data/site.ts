import { asset } from '~/lib/assets';
import { yearsSince } from '~/lib/years';

export const site = {
	name: 'Nguyễn Đình Anh',
	handle: 'DAN3002',
	url: 'https://dan3002.id.vn',
	email: 'dan3002.work@gmail.com',
	location: 'Hà Nội, Việt Nam',
	resume: '/Resume_Nguyễn Đình Anh.pdf',
	title: 'Nguyễn Đình Anh — DevOps & Software Engineer',
	description: 'DevOps and software engineer. I work on the platform at Drylab, and before that on DevOps at VPBank.',
	// First engineering job (FUNiX IT, Aug 2019); drives every "N years" on the page.
	careerStart: new Date('2019-08-01'),
	profile: asset('profile.png'),
	socials: [
		{ label: 'GitHub', href: 'https://github.com/DAN3002', icon: 'simple-icons:github' },
		{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/dan3002/', icon: 'simple-icons:linkedin' },
		// Facebook dropped on purpose: personal profile, not useful for hiring.
	],
} as const;

/** Whole years since careerStart at build time; pages re-compute it in the browser (lib/years.ts). */
export const yearsInTech = (now = new Date()) => yearsSince(site.careerStart, now);

/** careerStart as YYYY-MM-DD, for data-years-since attributes. */
export const careerStartISO = site.careerStart.toISOString().slice(0, 10);

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
