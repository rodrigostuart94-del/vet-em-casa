/* Service Worker — Vet em Casa
   Cache simples para permitir instalação como app (PWA) e uso offline básico. */
const CACHE = "vetemcasa-v5";
const ASSETS = [
  "./",
  "./index.html",
  "./css/styles.css",
  "./js/data.js",
  "./js/main.js",
  "./manifest.webmanifest",
  "./assets/emblem.png",
  "./assets/logo-navy.jpg",
  "./assets/hero-logo.webp",
  "./assets/hero-logo-still.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  // Não intercepta terceiros (Google Fonts, Maps, WhatsApp)
  if (new URL(req.url).origin !== self.location.origin) return;
  // Network-first: sempre busca a versão mais recente online; usa o cache só como fallback (offline).
  e.respondWith(
    fetch(req).then((res) => {
      const copy = res.clone();
      caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
      return res;
    }).catch(() => caches.match(req))
  );
});
