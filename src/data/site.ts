import { asset } from '~/lib/assets';
import { yearsSince } from '~/lib/years';

export const site = {
	name: 'Nguyễn Đình Anh',
	handle: 'DAN3002',
	url: 'https://dan3002.id.vn',
	email: 'dan3002.work@gmail.com',
	location: 'Hà Nội, Việt Nam',
	// ASCII URL is the one we link; the old Vietnamese-named file stays for links already shared.
	resume: '/nguyen-dinh-anh-resume.pdf',
	title: 'Nguyễn Đình Anh (DAN3002) — DevOps & Software Engineer',
	description:
		'Nguyễn Đình Anh (Nguyen Dinh Anh, DAN3002): DevOps and software engineer building the platform at Drylab. Ex-VPBank DevOps, AWS certified.',
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
