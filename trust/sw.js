var CACHE_NAME = 'trust-v2';
var PRECACHE_URLS = [
  './',
  'index.html',
  'css/slides.css?v10',
  'css/balloon.css?v10',
  'css/FuturaHandwritten.ttf',
  'words.html',
  'js/lib/helpers.js?v10',
  'js/lib/pegasus.js?v10',
  'js/lib/minpubsub.src.js?v10',
  'js/lib/q.js?v10',
  'js/lib/pixi.min.js?v10',
  'js/lib/howler.js?v10',
  'js/lib/tweenjs-0.6.2.min.js?v10',
  'js/lib/sharing.js?v10',
  'js/core/Loader.js?v10',
  'js/core/Slideshow.js?v10',
  'js/core/SlideSelect.js?v10',
  'js/core/Button.js?v10',
  'js/core/TextBox.js?v10',
  'js/core/Words.js?v10',
  'js/core/IncDecNumber.js?v10',
  'js/core/Slider.js?v10',
  'js/core/Scratcher.js?v10',
  'js/core/Background.js?v10',
  'js/core/ImageBox.js?v10',
  'js/core/PayoffsUI.js?v10',
  'js/sims/Splash.js?v10',
  'js/sims/PD.js?v10',
  'js/sims/Iterated.js?v10',
  'js/sims/Tournament.js?v10',
  'js/sims/SandboxUI.js?v10',
  'js/slides/0_Slides_Intro.js?v10',
  'js/slides/1_Slides_OneOff.js?v10',
  'js/slides/2_Slides_Iterated.js?v10',
  'js/slides/3_Slides_Tournament.js?v10',
  'js/slides/4_Slides_Evolution.js?v10',
  'js/slides/5_Slides_Distrust.js?v10',
  'js/slides/6_Slides_Noise.js?v10',
  'js/slides/7_Slides_Sandbox.js?v10',
  'js/slides/8_Slides_Conclusion.js?v10',
  'js/slides/9_Slides_Credits.js?v10',
  'js/mobile-fix.js?v10',
  'js/main.js?v10',
  'favicon.png'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(PRECACHE_URLS);
    }).then(function() {
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName !== CACHE_NAME;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    }).then(function() {
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', function(event) {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(function(cached) {
      if (cached) {
        var fetchPromise = fetch(event.request).then(function(response) {
          if (response && response.status === 200 && response.type === 'basic') {
            var responseToCache = response.clone();
            caches.open(CACHE_NAME).then(function(cache) {
              cache.put(event.request, responseToCache);
            });
          }
          return response;
        }).catch(function() {
          return cached;
        });
        return cached;
      }

      return fetch(event.request).then(function(response) {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        var responseToCache = response.clone();
        caches.open(CACHE_NAME).then(function(cache) {
          cache.put(event.request, responseToCache);
        });
        return response;
      }).catch(function() {
        return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
      });
    })
  );
});
