const CACHE_NAME = 'taphoa-tk-v1';
const urlsToCache = [
  './',
  './index.html',
  './images/logo-192.png',
  './images/logo-512.png'
  // Nếu có thêm CSS tĩnh hay ảnh nào quan trọng, ông nhét thêm link vào đây
];

// Cài đặt Service Worker và lưu cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Đã mở cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Chặn các request để lấy data từ cache ra cho lẹ (Trải nghiệm Offline)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Nếu tìm thấy trong cache thì trả về luôn, khỏi tốn dung lượng tải lại
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});