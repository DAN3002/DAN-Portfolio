interface ImportMetaEnv {
	readonly PUBLIC_TURNSTILE_SITE_KEY?: string;
	readonly PUBLIC_EMAIL_API_ENDPOINT?: string;
	readonly PUBLIC_UMAMI_WEBSITE_ID?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

interface Window {
	umami?: {
		track: (name: string, data?: Record<string, unknown>) => void;
		identify?: (idOrData: string | Record<string, unknown>, data?: Record<string, unknown>) => void;
	};
	/** Read by the Umami tracker before it starts (umami.is/docs/tracker-configuration). */
	umamiConfig?: { distinctId?: string };
	doNotTrack?: string;
	turnstile?: {
		render: (el: HTMLElement, opts: Record<string, unknown>) => string;
		reset: (id?: string) => void;
	};
	onTurnstileLoad?: () => void;
}
