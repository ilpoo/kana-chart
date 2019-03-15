import { cacheName } from "./worker";

export default async function fetchUncachedResource (
  event: FetchEvent,
) {
  try {
    const requestClone = event.request.clone();
    const resource = await fetch(requestClone);
    if (!resource) {
      console.log("[ServiceWorker] fetch failed");

      return new Response("404");
    }
    const cache = await caches.open(cacheName);
    const resourceClone = resource.clone();
    cache.put(event.request, resourceClone);
    console.log();

    return resource;
  } catch (error) {
    console.log(`ServiceWorker] error fetching uncached data`, error);

    return new Response(
      null,
      {
        status: 408,
        statusText: "Request timed out",
      },
    );
  }
}
