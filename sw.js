var cacheName = "TicTacToeV21";

var appShellFiles = [
	".",
	"index.html",
	"script.js",
	"style.css",
	"confetti.browser.min.js",
	"poppins.woff2",
	"icons/favicon/favicon.ico",
	"icons/android/android-launchericon-144-144.png",
];

self.addEventListener("install", (e) => {
	console.log("[Service Worker] Install");
	e.waitUntil(
		caches.open(cacheName).then((cache) => {
			console.log("[Service Worker] Caching all: app shell and content");
			return cache.addAll(appShellFiles);
		})
	);
});

self.addEventListener("activate", (e) => {
	e.waitUntil(
		caches.keys().then((keyList) => {
			return Promise.all(
				keyList.map((key) => {
					if (key !== cacheName) {
						return caches.delete(key);
					}
				})
			);
		})
	);
});

self.addEventListener("fetch", (e) => {
	e.respondWith(
		caches.match(e.request).then((r) => {
			console.log("[Service Worker] Fetching resource: " + e.request.url);
			return (
				r ||
				fetch(e.request).then((response) => {
					return caches.open(cacheName).then((cache) => {
						console.log(
							"[Service Worker] Caching new resource: " +
								e.request.url
						);
						cache.put(e.request, response.clone());
						return response;
					});
				})
			);
		})
	);
});

self.addEventListener("message", function (event) {
	if (event.data.action === "skipWaiting") {
		self.skipWaiting();
	}
});
