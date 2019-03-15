import fetchUncachedResource from "./fetchUncachedResource";

export default async function resourceFetcher (
  event: FetchEvent,
) {
  const cachedResource = await caches.match(event.request);
  if (cachedResource) {
    console.log("[ServiceWorker] requested resource found in cache");

    return cachedResource;
  } else {
    return fetchUncachedResource(event);
  }
}
