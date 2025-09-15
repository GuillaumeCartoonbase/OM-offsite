document.addEventListener("DOMContentLoaded", async () => {
	try {
		const res = await fetch("../footer.html");
		const html = await res.text();
		document.querySelector("footer").innerHTML = html;

		// Opt-in: select all footer items on unknown pages
		setFooterActive({ selectAllOnUnknown: true });
	} catch (err) {
		console.error("Error loading footer:", err);
	}
});

function setFooterActive(opts = {}) {
	const { selectAllOnUnknown = false } = opts;

	const ids = [
		"accueilFooter",
		"programmeFooter",
		"carteFooter",
		"participantsFooter",
	];
	const els = Object.fromEntries(
		ids.map((id) => [id, document.getElementById(id)])
	);

	const PAGE_TO_ID = {
		"": "accueilFooter",
		"/": "accueilFooter",
		"index.html": "accueilFooter",
		"programme.html": "programmeFooter",
		"carte.html": "carteFooter",
		"participants.html": "participantsFooter",
	};

	const path = window.location.pathname;
	const file = path.split("/").pop() || "index.html";
	const activeId = PAGE_TO_ID[file];

	const setSelected = (node, isSelected) => {
		if (!node) return;
		node.classList.toggle("selected", isSelected);
		node.classList.toggle("notSelected", !isSelected);
	};

	if (!activeId) {
		// Unknown page
		if (selectAllOnUnknown) {
			ids.forEach((id) => setSelected(els[id], true)); // all selected
		} else {
			// default behavior: only accueil selected
			ids.forEach((id) => setSelected(els[id], id === "accueilFooter"));
		}
		return;
	}

	// Known page: select only the matched one
	ids.forEach((id) => setSelected(els[id], id === activeId));
}
