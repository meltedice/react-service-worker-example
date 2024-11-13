// Service worker works in iframe in:
// - http://localhost:3010
// - file://path/to/packages/parent/public/index.html
//
// Ref:
// - https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorker
// - https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers

self.addEventListener('install', event => {
  // Apply this service worker immediately
  self.skipWaiting();
});

const putInCache = async (request, response) => {
  const cache = await caches.open("v1");
  await cache.put(request, response);
};

const customCache = async ({ request, preloadResponsePromise }) => {
  // First try to get the resource from the cache
  const responseFromCache = await caches.match(request);
  if (responseFromCache) {
    return responseFromCache;
  }

  // Next try to use (and cache) the preloaded response, if it's there
  const preloadResponse = await preloadResponsePromise;
  if (preloadResponse) {
    putInCache(request, preloadResponse.clone());
    return preloadResponse;
  }

  // Mock the dummy API /test-api
  const requestURL = new URL(request.url);
  if (requestURL.href === 'https://example.com/test-api') {
    // if (requestURL.pathname === '/test-api') {
    return new Response(JSON.stringify({ message: "Mocked API is called via SW" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Next try to get the resource from the network
  try {
    const responseFromNetwork = await fetch(request);
    // response may be used only once
    // we need to save clone to put one copy in cache
    // and serve second one
    putInCache(request, responseFromNetwork.clone());
    return responseFromNetwork;
  } catch (error) {
    return new Response(JSON.stringify({ message: `Network error happened: ${error}` }), {
      status: 408,
      headers: { "Content-Type": "application/json" },
    });
  }
};

self.addEventListener("fetch", (event) => {
  event.respondWith(
    customCache({
      request: event.request,
      preloadResponsePromise: event.preloadResponse,
    }),
  );
});
