// Shared behaviour for every popup on the page (projects, awards).
//
// Markup: a trigger with data-open-dialog="<dialog id>" and a native <dialog data-dialog>.
// Native showModal() gives the focus trap, Escape and the inert background for free.
// We add: close button, click on the backdrop, focus back to whatever opened it
// (browsers differ here), and switching from one dialog to another (an award's
// "See the project" opens that project's dialog, and closing it returns to the page).

let opener: HTMLElement | null = null;

export function openDialog(id: string, from?: HTMLElement | null) {
	const dlg = document.getElementById(id);
	if (!(dlg instanceof HTMLDialogElement)) return;
	// Coming from another open dialog: keep the original opener for focus return.
	const current = document.querySelector<HTMLDialogElement>('dialog[open][data-dialog]');
	if (current && current !== dlg) {
		current.dataset.handoff = '1';
		current.close();
	} else if (from) {
		opener = from;
	}
	dlg.showModal();
}

let wired = false;

export function initDialogs() {
	if (wired) return;
	wired = true;

	document.addEventListener('click', (e) => {
		const t = (e.target as Element | null)?.closest<HTMLElement>('[data-open-dialog]');
		if (!t) return;
		e.preventDefault();
		openDialog(t.dataset.openDialog!, t);
	});

	document.querySelectorAll<HTMLDialogElement>('dialog[data-dialog]').forEach((dlg) => {
		dlg.addEventListener('close', () => {
			if (dlg.dataset.handoff) {
				delete dlg.dataset.handoff; // another dialog took over; keep the opener
				return;
			}
			opener?.focus({ preventScroll: true });
			opener = null;
		});
		dlg.querySelector('[data-dialog-close]')?.addEventListener('click', () => dlg.close());
		dlg.addEventListener('click', (e) => {
			if (e.target === dlg) dlg.close(); // click on the backdrop
		});
	});
}
