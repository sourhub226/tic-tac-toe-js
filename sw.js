var cacheName = 'TicTacToeV2';
var appShellFiles = [
  '.',
  'index.html',
  'script.js',
  'style.css',
  'confetti.browser.min.js',
  'poppins.woff2',
  'icons/android/android-launchericon-144-144.png', 'icons/android/android-launchericon-192-192.png', 'icons/android/android-launchericon-48-48.png', 'icons/android/android-launchericon-512-512.png', 'icons/android/android-launchericon-72-72.png', 'icons/android/android-launchericon-96-96.png', 'icons/chrome/chrome-extensionmanagementpage-48-48.png', 'icons/chrome/chrome-favicon-16-16.png', 'icons/chrome/chrome-installprocess-128-128.png', 'icons/firefox/firefox-general-128-128.png', 'icons/firefox/firefox-general-16-16.png', 'icons/firefox/firefox-general-256-256.png', 'icons/firefox/firefox-general-32-32.png', 'icons/firefox/firefox-general-48-48.png', 'icons/firefox/firefox-general-64-64.png', 'icons/firefox/firefox-general-90-90.png', 'icons/firefox/firefox-marketplace-128-128.png', 'icons/firefox/firefox-marketplace-512-512.png', 'icons/windows10/Square150x150Logo.scale-100.png', 'icons/windows10/Square150x150Logo.scale-125.png', 'icons/windows10/Square150x150Logo.scale-150.png', 'icons/windows10/Square150x150Logo.scale-200.png',
  'icons/windows10/Square150x150Logo.scale-400.png', 'icons/windows10/Square310x310Logo.scale-100.png', 'icons/windows10/Square310x310Logo.scale-125.png', 'icons/windows10/Square310x310Logo.scale-150.png', 'icons/windows10/Square310x310Logo.scale-200.png', 'icons/windows10/Square310x310Logo.scale-400.png', 'icons/windows10/Square44x44Logo.scale-100.png', 'icons/windows10/Square44x44Logo.scale-125.png', 'icons/windows10/Square44x44Logo.scale-150.png', 'icons/windows10/Square44x44Logo.scale-200.png', 'icons/windows10/Square44x44Logo.scale-400.png', 'icons/windows10/Square44x44Logo.targetsize-16.png', 'icons/windows10/Square44x44Logo.targetsize-16_altform-unplated.png', 'icons/windows10/Square44x44Logo.targetsize-24.png', 'icons/windows10/Square44x44Logo.targetsize-24_altform-unplated.png', 'icons/windows10/Square44x44Logo.targetsize-256.png', 'icons/windows10/Square44x44Logo.targetsize-256_altform-unplated.png', 'icons/windows10/Square44x44Logo.targetsize-32.png', 'icons/windows10/Square44x44Logo.targetsize-32_altform-unplated.png', 'icons/windows10/Square44x44Logo.targetsize-48.png', 'icons/windows10/Square44x44Logo.targetsize-48_altform-unplated.png', 'icons/windows10/Square71x71Logo.scale-100.png', 'icons/windows10/Square71x71Logo.scale-125.png', 'icons/windows10/Square71x71Logo.scale-150.png', 'icons/windows10/Square71x71Logo.scale-200.png', 'icons/windows10/Square71x71Logo.scale-400.png', 'icons/windows10/StoreLogo.png', 'icons/windows10/StoreLogo.scale-100.png', 'icons/windows10/StoreLogo.scale-125.png', 'icons/windows10/StoreLogo.scale-150.png', 'icons/windows10/StoreLogo.scale-200.png', 'icons/windows10/StoreLogo.scale-400.png'
];


self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install');
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log('[Service Worker] Caching all: app shell and content');
      return cache.addAll(appShellFiles);
    })
  );
});


self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((r) => {
      console.log('[Service Worker] Fetching resource: ' + e.request.url);
      return r || fetch(e.request).then((response) => {
        return caches.open(cacheName).then((cache) => {
          console.log('[Service Worker] Caching new resource: ' + e.request.url);
          cache.put(e.request, response.clone());
          return response;
        });
      });
    })
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== cacheName) {
          return caches.delete(key);
        }
      }));
    })
  );
});

self.addEventListener('message', function (event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});