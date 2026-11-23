// Rich text in these lists is limited to <b> and <a>, written by hand here,
// so rendering it with set:html is safe (no user input reaches it).

export interface TimelineEntry {
	org: string;
	role: string;
	start: string;
	end: string;
	url?: string;
	points: string[];
}

export const experience: TimelineEntry[] = [
	{
		org: 'Drylab',
		role: 'Member of Technical Staff',
		start: 'Oct 2025',
		end: 'Present',
		url: 'https://thedrylab.com/',
		points: [
			'Building an AI-automated bioinformatics platform that covers the full research workflow, from data search and analysis to model training.',
			'Working on an enterprise-grade platform used by life-science teams to speed up their discovery phase.',
		],
	},
	{
		org: 'VPBank',
		role: 'DevOps Engineer · Senior Specialist',
		start: 'Aug 2024',
		end: 'Sep 2025',
		points: [
			'Youngest Senior Specialist at VPBank, at 21.',
			'Aligned the ESB architecture with microservices and cloud environments, focusing on stability, performance and scale.',
			'Automated monitoring with a GitOps workflow for proactive, real-time incident handling.',
			'Re-architected existing APIs and services onto microservices and message-oriented middleware (IBM MQ).',
			'Designed CI/CD pipelines that streamlined deployment and testing.',
		],
	},
	{
		org: 'OpenCommerce Group',
		role: 'Full-Stack Developer',
		start: 'Mar 2024',
		end: 'Jul 2024',
		points: [
			'Built parts of a dropshipping e-commerce system.',
			'Extended payment systems in Go and Vue, integrating Stripe, PayPal and other providers.',
		],
	},
	{
		org: 'FUNiX',
		role: 'Full-Stack Developer & Program Development Officer',
		start: 'Aug 2021',
		end: 'Feb 2024',
		points: [
			'Built internal apps, including the Mentoring System and the Learning Management System (LMS).',
			'Managed the team\'s cloud resources, keeping access efficient and secure.',
			'Designed the xSeries courses: <b>Full Stack with MERN, Data Engineering, Cloud Computing and DevOps</b>.',
		],
	},
	{
		org: 'FPT Software',
		role: 'Backend Developer',
		start: 'Aug 2020',
		end: 'Aug 2021',
		points: [
			'Worked part-time while finishing high school.',
			'Contributed to internal apps, including the Mentoring System and the LMS.',
		],
	},
	{
		org: 'FUNiX IT department',
		role: 'Backend Developer',
		start: 'Aug 2019',
		end: 'Aug 2020',
		points: [
			'Started working at 17, straight after my first university year.',
			'Built a learning tool and management software with JavaScript, Node.js and Firebase.',
		],
	},
];

export const education: TimelineEntry[] = [
	{
		org: 'FPT University',
		role: 'B.Sc. Software Engineering',
		start: 'Jan 2022',
		end: 'Aug 2023',
		points: ['Graduated at <b>20</b>, two years ahead of schedule.', 'Full scholarship for the entire program.'],
	},
	{
		org: 'FUNiX University',
		role: 'Software Engineering',
		start: 'Aug 2018',
		end: 'Dec 2021',
		points: ['Started university at <b>16</b>.', 'Scholarship every semester.'],
	},
];

export const activities: TimelineEntry[] = [
	{
		org: 'AWS Academy',
		role: 'AWS Authorized Instructor',
		start: 'Sep 2022',
		end: 'Present',
		url: 'https://aws.amazon.com/training/awsacademy/',
		points: [
			'Lecturer for the AWS Academy Cloud Training Bootcamp in Vietnam, run by FUNiX and AWS Academy.',
			'Taught <b>AWS Cloud Foundations</b> and <b>AWS Solutions Architect – Associate</b> to a cohort of nearly 800 students.',
		],
	},
	{
		org: 'FUNiX',
		role: 'Program mentor',
		start: 'Oct 2021',
		end: 'Dec 2025',
		points: ['Answer students\' technical and soft-skill questions and run competency exams.'],
	},
	{
		org: 'JS Club',
		role: 'Academic department',
		start: 'May 2022',
		end: 'Present',
		points: ['University club running coding classes, academic events and tech talks.'],
	},
	{
		org: 'Developh Vietnam',
		role: 'Tech content mentor',
		start: 'Jul 2021',
		end: 'Dec 2021',
		points: ['Mentored students building their own projects in the DIY Camp program.'],
	},
	{
		org: 'Codelearn',
		role: 'Problem setter & blog writer',
		start: 'Aug 2020',
		end: 'Aug 2021',
		points: ['Wrote and reviewed weekly and monthly competitive-programming problems; top of the leaderboard.'],
	},
];
