(() => {
	const MODAL_KEY = "firstVisitSeen_v2"; // bump version to show again after updates
	const modal = document.getElementById("firstVisitModal");
	const okBtn = document.getElementById("fvm-ok");
	const closeBtn = modal?.querySelector(".fvm-close");

	// If already seen, bail
	if (localStorage.getItem(MODAL_KEY) === "1") return;

	// Show ASAP after first paint
	const show = () => {
		if (!modal) return;
		try {
			modal.showModal(); // modern browsers
		} catch {
			modal.setAttribute("open", ""); // fallback if <dialog> not fully supported
		}
	};

	const hideAndRemember = () => {
		localStorage.setItem(MODAL_KEY, "1");
		if (typeof modal.close === "function") modal.close();
		else modal.removeAttribute("open");
	};

	// Wire buttons
	okBtn?.addEventListener("click", hideAndRemember);
	closeBtn?.addEventListener("click", hideAndRemember);

	// Optional: close on backdrop click
	modal?.addEventListener("click", (e) => {
		const rect = modal.getBoundingClientRect();
		const inside =
			e.clientX >= rect.left &&
			e.clientX <= rect.right &&
			e.clientY >= rect.top &&
			e.clientY <= rect.bottom;
		if (!inside) hideAndRemember();
	});

	// Show after DOM ready (no FOUC)
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", show);
	} else {
		show();
	}
})();
