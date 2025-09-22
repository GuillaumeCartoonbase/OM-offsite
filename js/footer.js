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
			ids.forEach((id) => setSelected(els[id], true));
		} else {
			ids.forEach((id) => setSelected(els[id], id === "accueilFooter"));
		}
		updateFooterIcons(els, ids);
		return;
	}

	// Known page: select only the matched one
	ids.forEach((id) => setSelected(els[id], id === activeId));
	updateFooterIcons(els, ids);
}

// set the correct icon (green or white)
function updateFooterIcons(els, ids) {
	ids.forEach((id) => {
		const node = els[id];
		if (!node) return;

		const img =
			node.querySelector("img") || (node.tagName === "IMG" ? node : null);
		const icons = ICONS[id];
		if (!img || !icons) return;

		const useGreen = node.classList.contains("selected");
		img.src = useGreen ? icons.selected : icons.notSelected;
	});
}
