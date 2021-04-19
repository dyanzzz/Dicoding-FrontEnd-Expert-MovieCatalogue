import CacheHelper from "./utils/cache-helper";
import 'regenerator-runtime';

const { assets } = global.serviceWorkerOption;

self.addEventListener('install', (event) => {
	console.log('Installing service worker...!!!');

	event.waitUntil(CacheHelper.cachingAppShell([...assets, './']));
});

self.addEventListener('activate', (event) => {
	console.log('Activating service worker...!!!');

	event.waitUntil(CacheHelper.deleteOldCache());
});

self.addEventListener('fetch', (event) => {
	console.log(event.request);

	event.respondWith(fetch(event.request));

	event.respondWith(CacheHelper.revalidateCache(event.request));
	
});