import addFilesToBeCached from "./addFilesToBeCached";
import clearOutdatedCaches from "./clearOutdatedCaches";
import resourceFetcher from "./resourceFetcher";

const _self = self as unknown as ServiceWorkerGlobalScope;

export const cacheName = "app-cache-v1.9.5";

_self.addEventListener("install", event => {
  console.log("[ServiceWorker] installed");
  event.waitUntil(
    addFilesToBeCached(),
  );
});

_self.addEventListener("activate", event => {
  console.log("[ServiceWorker] activated", event);
  event.waitUntil(
    clearOutdatedCaches(),
  );
  return _self.clients.claim();
});

_self.addEventListener("fetch", event => {
  console.log("[ServiceWorker] fetch event", event.request);
  event.respondWith(
    resourceFetcher(event),
  );
});


