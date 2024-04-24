const cacheName = "walletaya-cache";

const defaultContentToCache = [
  "/sw.js",
  "/src/main.js",
  "/src/assets/styles/index.scss",
  "/src/components/App.vue",
];

const cacheDefaultContent = async () => {
  const cache = await caches.open(cacheName);
  await cache.addAll(defaultContentToCache);

  // Indicate that the SW has finished to cache content and go next step
  self.skipWaiting();
};

const deletedOldCache = async () => {
  const keys = await caches.keys();

  // Wait for each existing key to be deleted
  await Promise.all(
    keys.map((key) => {
      if (!key.includes(cacheName)) {
        return caches.delete(key);
      }
    })
  );

  // Replace the old SW by the current freshly created
  clients.claim();
};

// When the page loads
self.addEventListener("install", (event) => {
  event.waitUntil(cacheDefaultContent());
});

// When the current SW replace the old one
self.addEventListener("activate", (event) => {
  event.waitUntil(deletedOldCache());
});

const fetchCacheOrNetwork = async (event) => {
  try {
    // Try to normally fetch it from network and cache it
    const responseFromNetwork = await fetch(event.request);
    const cache = await caches.open(cacheName);
    await cache.put(event.request, responseFromNetwork.clone());

    // Return the fetched request from network
    return responseFromNetwork;
  } catch (error) {
    // Checks if cache has the requested content and returns it if yes
    const responseFromCache = await caches.match(event.request);
    if (responseFromCache) {
      return responseFromCache;
    }

    // If the request can't get any response, return a fallback content
    // const fallbackResponse = await caches.match(fallbackUrl);
    // if (fallbackResponse) {
    //   return fallbackResponse;
    // }

    // If nothing can be return until here, return a default error
    return new Response("Network error happened", {
      status: 408,
      headers: { "Content-Type": "text/plain" },
    });
  }
};

// Hooks request calls to enhance default behaviour
self.addEventListener("fetch", (event) => {
  event.respondWith(fetchCacheOrNetwork(event));
});

// // const putInCache = async (request, response) => {
// //   const cache = await caches.open("v1");
// //   await cache.put(request, response);
// // };

// // const cacheFirst = async (request) => {
// //   const responseFromCache = await caches.match(request);
// //   if (responseFromCache) {
// //     return responseFromCache;
// //   }

// //   try {
// //     const responseFromNetwork = await fetch(request);
// //     putInCache(request, responseFromNetwork.clone());
// //     return responseFromNetwork;
// //   } catch (error) {
// //     const fallbackResponse = await caches.match(fallbackUrl);
// //     if (fallbackResponse) {
// //       return fallbackResponse;
// //     }
// //     // Quand il n'y a même pas de contenu par défaut associé
// //     // on doit tout de même renvoyer un objet Response
// //     return new Response("Une erreur réseau s'est produite", {
// //       status: 408,
// //       headers: { "Content-Type": "text/plain" },
// //     });
// //   }
// // };

// // self.addEventListener("fetch", (event) => {
// //   event.respondWith(
// //     cacheFirst({
// //       request: event.request,
// //       fallbackUrl: "/gallery/myLittleVader.jpg",
// //     }),
// //   );
// // });

// const addResourcesToCache = async (resources) => {
//   const cache = await caches.open(cacheName);
//   await cache.addAll(resources);
// };

// const putInCache = async (request, response) => {
//   const cache = await caches.open(cacheName);
//   await cache.put(request, response);
// };

// const cacheFirst = async ({ request, preloadResponsePromise, fallbackUrl }) => {
//   // Pour commencer on essaie d'obtenir la ressource depuis le cache
//   const responseFromCache = await caches.match(request);
//   if (responseFromCache) {
//     return responseFromCache;
//   }

//   // Ensuite, on tente d'utiliser et de mettre en cache
//   // la réponse préchargée si elle existe
//   const preloadResponse = await preloadResponsePromise;
//   if (preloadResponse) {
//     console.info("using preload response", request, preloadResponse);
//     putInCache(request, preloadResponse.clone());
//     return preloadResponse;
//   }

//   // Ensuite, on tente de l'obtenir du réseau
//   try {
//     const responseFromNetwork = await fetch(request);
//     // Une réponse ne peut être utilisée qu'une fois
//     // On la clone pour en mettre une copie en cache
//     // et servir l'originale au navigateur
//     putInCache(request, responseFromNetwork.clone());
//     return responseFromNetwork;
//   } catch (error) {
//     const fallbackResponse = await caches.match(fallbackUrl);
//     if (fallbackResponse) {
//       return fallbackResponse;
//     }
//     // Quand il n'y a même pas de contenu par défaut associé
//     // on doit tout de même renvoyer un objet Response
//     return new Response("Network error happened", {
//       status: 408,
//       headers: { "Content-Type": "text/plain" },
//     });
//   }
// };

// // On active le préchargement à la navigation
// const enableNavigationPreload = async () => {
//   if (self.registration.navigationPreload) {
//     await self.registration.navigationPreload.enable();
//   }
// };

// self.addEventListener("activate", (event) => {
//   event.waitUntil(enableNavigationPreload());
// });

// const deleteCache = async (key) => {
//   await caches.delete(key);
// };

// const deleteOldCaches = async () => {
//   const cacheKeepList = ["v1"];
//   const keyList = await caches.keys();
//   const cachesToDelete = keyList.filter((key) => !cacheKeepList.includes(key));
//   await Promise.all(cachesToDelete.map(deleteCache));
// };

// self.addEventListener("activate", (event) => {
//   event.waitUntil(deleteOldCaches());
// });

// self.addEventListener("install", (event) => {
//   event.waitUntil(addResourcesToCache(contentToCache));
// });

// self.addEventListener("fetch", (event) => {
//   event.respondWith(
//     cacheFirst({
//       request: event.request,
//       preloadResponsePromise: event.preloadResponse,
//     })
//   );
// });
