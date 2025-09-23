const CACHE = "app-cache-v3";
const PRECACHE = [
	"/", // only if your root HTML is stable
	"/offline.html",
	// "/css/accueil.css",
	// "/css/carte.css",
	// "/css/contacts.css",
	// "/css/footer.css",
	// "/css/header.css",
	// "/css/participants.css",
	// "/css/programme.css",
	// "/css/styles.css",
	// "/css/subpages.css",
	// "/js/button.js",
	// "/js/code.js",
	// "/js/contacts.js",
	// "/js/footer.js",
	// "/js/goback.js",
	// "/js/people.js",
	// "/js/protection.js",
	// "/js/rive.js",
	// "/js/scheduleDOM.js",
	// "/js/search.js",
	// "/data/contacts.json",
	// "/data/people.json",
	// "/data/schedule.json",
	// "/assets/rive/bcg_om_offsite.riv",
	// "/icons/icon-192.png",
	// "/icons/icon-512.png",
	// "/pages/info/arles.html",
	// "/pages/info/arts.html",
	// "/pages/info/baumaniere-les-baux-de-provence.html",
	// "/pages/info/carrieres-des-lumieres.html",
	// "/pages/info/domaine-de-manville.html",
	// "/pages/info/food.html",
	// "/pages/info/golf.html",
	// "/pages/info/histoire-beaux-de-provence.html",
	// "/pages/info/luma.html",
	// "/pages/info/oliveraie.html",
	// "/pages/info/ousteau-de-baumaniere.html",
	// "/pages/info/photographies-arles.html",
	// "/pages/info/saint-remy.html",
	// "/pages/info/trail.html",
	// "/pages/info/valise.html",
	// "/pages/info/velo.html",
	// "/pages/info/wine.html",
	// "/pages/carte.html",
	// "/pages/footer.html",
	// "/pages/participants.html",
	// "/pages/programme.html",
];

self.addEventListener("install", (e) => {
	e.waitUntil(caches.open(CACHE).then((c) => c.addAll(PRECACHE)));
	self.skipWaiting();
});

self.addEventListener("activate", (e) => {
	e.waitUntil(
		caches
			.keys()
			.then((keys) =>
				Promise.all(keys.map((k) => (k !== CACHE ? caches.delete(k) : null)))
			)
	);
	self.clients.claim();
});

// Navigations: network-first, fallback offline
// Everything else (same-origin GET): cache-first and save for offline
self.addEventListener("fetch", (e) => {
	const req = e.request;
	if (req.method !== "GET") return;

	if (req.mode === "navigate") {
		e.respondWith(fetch(req).catch(() => caches.match("/offline.html")));
		return;
	}

	// Cache-first for same-origin assets/pages
	const sameOrigin = new URL(req.url).origin === self.location.origin;
	if (sameOrigin) {
		e.respondWith(
			caches.match(req).then(
				(cached) =>
					cached ||
					fetch(req).then((res) => {
						if (res.ok) caches.open(CACHE).then((c) => c.put(req, res.clone()));
						return res;
					})
			)
		);
	}
});
