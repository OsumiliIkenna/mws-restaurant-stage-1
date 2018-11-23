const CACHE_NAME = 'restaurant-reviews-v1';
const OFFLINE_FILES_TO_CACHE = [
    '/',
    'index.html',
    'restaurant.html',
    'css/styles.css',
    'data/restaurants.json',
    'js/dbhelper.js',
    'js/main.js',
    'js/restaurant_info.js',
    'img/1.jpg',
    'img/2.jpg',
    'img/3.jpg',
    'img/4.jpg',
    'img/5.jpg',
    'img/6.jpg',
    'img/7.jpg',
    'img/8.jpg',
    'img/9.jpg',
    'img/10.jpg',
];

/**
 * Installing Cache.
 */
self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open(CACHE_NAME)
      .then((cache) => {
        console.info('[sw.js] cached all files');
        return cache.addAll(OFFLINE_FILES_TO_CACHE);
      })
    );
});

/**
 * Activating the Cache.
 */
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.filter((cacheName) => {
                    return cacheName.startsWith('restaurant-') &&
                        cacheName != CACHE_NAME;
                }).map((cacheName) => {
                    console.log("[SW] Removing cached files from ", cacheName);
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

/**
 * Returning Cache Responses.
 */
self.addEventListener('fetch', (event) => {
  event.respondWith(
      caches.match(event.request).then((response) => {
          if(response){
            return response;
          }
          else if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') {
            return;
          }
          return fetch(event.request);
      })
  );    
});

