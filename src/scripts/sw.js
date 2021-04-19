self.addEventListener('install', (event) => {
	console.log('Installing service worker...!!!');

	// TODO caching app shell resource
});

self.addEventListener('activate', (event) => {
	console.log('Activating service worker...!!!');

	// TODO delete old caches
});

self.addEventListener('fetch', (event) => {
	console.log(event.request);

	event.respondWith(fetch(event.request));

	// TODO add/get fetch request to/from caches
	
});