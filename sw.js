const CACHE = "sleep-tracker-v1";
const ASSETS = ["/", "/index.html", "/manifest.json"];

// ── Install & cache ────────────────────────────────────────────────────────
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

// ── Fetch (offline first for shell, network first for CDN) ─────────────────
self.addEventListener("fetch", e => {
  if (e.request.url.includes("cdnjs.cloudflare.com")) {
    e.respondWith(
      caches.open(CACHE).then(async cache => {
        const cached = await cache.match(e.request);
        if (cached) return cached;
        const res = await fetch(e.request);
        cache.put(e.request, res.clone());
        return res;
      })
    );
    return;
  }
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});

// ── Notification scheduling ────────────────────────────────────────────────
let notifTimer = null;

self.addEventListener("message", e => {
  if (e.data?.type === "SCHEDULE_NOTIF") {
    if (notifTimer) clearTimeout(notifTimer);
    const { delayMs, title, body } = e.data;
    if (delayMs > 0 && delayMs < 86400000 * 2) {
      notifTimer = setTimeout(() => {
        self.registration.showNotification(title, {
          body,
          icon: "/icon-192.png",
          badge: "/icon-192.png",
          tag: "daily-reminder",
          renotify: true,
          vibrate: [200, 100, 200],
        });
      }, delayMs);
    }
  }
});

self.addEventListener("notificationclick", e => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: "window" }).then(list => {
      if (list.length) return list[0].focus();
      return clients.openWindow("/");
    })
  );
});
