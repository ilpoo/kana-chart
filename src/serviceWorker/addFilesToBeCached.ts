import filesToCache from "./filesToCache";
import { cacheName } from "./worker";

const _self = self as unknown as ServiceWorkerGlobalScope;

export default async function addFilesToBeCached () {
  try {
    const cache = await caches.open(cacheName);
    await cache.addAll(filesToCache);
    await _self.skipWaiting();
  }
  catch (error) {
    console.log("Installation failed: ", error);
  }
}
