// sw.js
const CACHE_NAME = "app-cache-v1";
const PRECACHE = [
	"/", // optional if your root HTML rarely changes
	"/offline.html", // <-- make sure this file exists
	// add '/styles.css', '/main.js', and key icons if you want them guaranteed offline
];

self.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE))
	);
	self.skipWaiting();
});

self.addEventListener("activate", (event) => {
	event.waitUntil(
		caches
			.keys()
			.then((keys) =>
				Promise.all(
					keys.map((k) => (k !== CACHE_NAME ? caches.delete(k) : null))
				)
			)
	);
	self.clients.claim();
});

// Handle navigations: network first; if it fails, show offline.html?from=<original>
self.addEventListener("fetch", (event) => {
	const req = event.request;
	if (req.mode === "navigate") {
		event.respondWith(
			fetch(req).catch(() => {
				const offlineUrl = "/offline.html?from=" + encodeURIComponent(req.url);
				return caches
					.match(offlineUrl)
					.then(
						(m) =>
							m ||
							caches.match("/offline.html").then((resp) => {
								// Append ?from on the fly (keeps it simple and cache-friendly)
								if (!resp) return new Response("Offline", { status: 503 });
								const headers = new Headers(resp.headers);
								return resp
									.blob()
									.then((body) => new Response(body, { headers, status: 200 }));
							})
					)
					.then((r) => r || caches.match("/offline.html"));
			})
		);
		return;
	}

	// Static assets: cache-first with background update
	event.respondWith(
		caches.match(req).then((cached) => {
			const fetchPromise = fetch(req)
				.then((res) => {
					if (
						res &&
						res.ok &&
						req.method === "GET" &&
						req.url.startsWith(self.location.origin)
					) {
						const copy = res.clone();
						caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
					}
					return res;
				})
				.catch(() => cached);
			return cached || fetchPromise;
		})
	);
});
