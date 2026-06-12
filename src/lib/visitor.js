// Anonymous visitor identification for Umami Distinct IDs.
// Generates a random UUID (no PII) persisted in localStorage so a single
// visitor can be traced across sessions. IDs are well under the 50-char limit.

const STORAGE_KEY = 'dan_visitor_id';

function generateId() {
	try {
		if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
			return crypto.randomUUID();
		}
	} catch {
		/* fall through to manual generation */
	}
	// Fallback for environments without crypto.randomUUID.
	return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
		const r = Math.floor(Math.random() * 16);
		const v = c === 'x' ? r : (r % 4) + 8;
		return v.toString(16);
	});
}

export default function getVisitorId() {
	if (typeof window === 'undefined' || !window.localStorage) {
		return generateId();
	}

	try {
		let id = window.localStorage.getItem(STORAGE_KEY);
		if (!id) {
			id = generateId();
			window.localStorage.setItem(STORAGE_KEY, id);
		}
		return id;
	} catch {
		// localStorage may be unavailable (private mode, blocked cookies, etc.).
		return generateId();
	}
}
