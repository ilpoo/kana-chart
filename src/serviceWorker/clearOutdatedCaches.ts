import { cacheName } from "./worker";

export default async function clearOutdatedCaches () {
  const oldCacheNames = await caches.keys();
  await Promise.all(
    oldCacheNames.map(async oldCacheName => {
      if(oldCacheName !== cacheName) {
        console.log("[ServiceWorker] removed cache: ", oldCacheName);
        return await caches.delete(oldCacheName);
      } else return false;
    }),
  );
}
