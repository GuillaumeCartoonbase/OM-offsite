document.addEventListener("DOMContentLoaded", async () => {
	try {
		const res = await fetch("/pages/footer.html");
		const html = await res.text();
		document.querySelector("footer").innerHTML = html;

		// Opt-in: select all footer items on unknown pages
		setFooterActive({ selectAllOnUnknown: true });
	} catch (err) {
		console.error("Error loading footer:", err);
	}
});

const ICONS = {
	accueilFooter: {
		selected: "/images/accueil green.png",
		notSelected: "/images/accueil gris.png",
	},
	programmeFooter: {
		selected: "/images/programme green.png",
		notSelected: "/images/programme gris.png",
	},
	carteFooter: {
		selected: "/images/carte green.png",
		notSelected: "/images/carte gris.png",
	},
	participantsFooter: {
		selected: "/images/participants green.png",
		notSelected: "/images/participants gris.png",
	},
};

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

	// Use the full pathname and normalize trailing slash
	let path = window.location.pathname;
	if (path.length > 1) path = path.replace(/\/+$/, "");

	const PATH_TO_ID = {
		"/": "accueilFooter",
		"/index.html": "accueilFooter",
		"/pages/programme.html": "programmeFooter",
		"/pages/carte.html": "carteFooter",
		"/pages/participants.html": "participantsFooter",
	};

	const activeId = PATH_TO_ID[path] || null;

	// Helper to (de)select
	const setSelected = (node, isSelected) => {
		if (!node) return;
		node.classList.toggle("selected", isSelected);
		node.classList.toggle("notSelected", !isSelected);
	};

	if (!activeId) {
		// Unknown page: either select none except Accueil, or (if you insist) all
		ids.forEach((id) =>
			setSelected(els[id], selectAllOnUnknown ? true : id === "accueilFooter")
		);
		updateFooterIcons(els, ids);
		return;
	}

	// Known page: select only that one
	ids.forEach((id) => setSelected(els[id], id === activeId));
	updateFooterIcons(els, ids);
}

function updateFooterIcons(els, ids) {
	ids.forEach((id) => {
		const node = els[id];
		if (!node) return;
		const img = node.querySelector("img");
		const icons = ICONS[id];
		if (!img || !icons) return;
		const selected = node.classList.contains("selected");
		img.src = selected ? icons.selected : icons.notSelected;
	});
}
