/* Closet da Raquel — service worker (cache offline do "esqueleto" do app).
   Nunca guarda nada do GitHub, da previsão do tempo ou de outros sites:
   os dados da Raquel ficam no IndexedDB/localStorage do aparelho, não neste cache. */
const VERSION = 'closet-raquel-v7.0.0';
const SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './logo.webp',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/maskable-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-32.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(VERSION);
    // Um arquivo faltando (ex.: ícone) não pode impedir a instalação.
    await Promise.allSettled(SHELL.map((url) => cache.add(new Request(url, { cache: 'reload' }))));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k.startsWith('closet-raquel-') && k !== VERSION).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Só o próprio site. api.github.com, open-meteo etc. vão direto à rede, sem cache.
  if (url.origin !== self.location.origin) return;

  // Páginas: rede primeiro (sempre a versão mais nova online); sem internet, usa a cópia salva.
  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(req);
        if (fresh && fresh.ok) {
          const cache = await caches.open(VERSION);
          cache.put('./index.html', fresh.clone());
        }
        return fresh;
      } catch (e) {
        return (await caches.match(req, { ignoreSearch: true })) || (await caches.match('./index.html')) || Response.error();
      }
    })());
    return;
  }

  // Arquivos estáticos do site: responde do cache e atualiza em segundo plano.
  event.respondWith((async () => {
    const cache = await caches.open(VERSION);
    const cached = await cache.match(req, { ignoreSearch: true });
    const network = fetch(req).then((res) => {
      if (res && res.ok && res.type === 'basic') cache.put(req, res.clone());
      return res;
    }).catch(() => null);
    return cached || (await network) || Response.error();
  })());
});
