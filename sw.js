// Service worker — ให้ Chrome ขึ้นปุ่มติดตั้ง + ดึงหน้าเว็บตัวใหม่อัตโนมัติ (network-first)
var CACHE = 'garden-launcher-v2';
var ASSETS = ['./', './index.html', './manifest.json', './icon.png'];

self.addEventListener('install', function(e){
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(function(c){ return c.addAll(ASSETS).catch(function(){}); }));
});

self.addEventListener('activate', function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.map(function(k){ if (k !== CACHE) return caches.delete(k); }));
    }).then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function(e){
  var req = e.request;
  var accept = (req.headers.get('accept') || '');
  // หน้าเว็บ/HTML -> เอาตัวใหม่จากเน็ตก่อนเสมอ (กันค้างเวอร์ชันเก่า)
  if (req.mode === 'navigate' || accept.indexOf('text/html') > -1){
    e.respondWith(
      fetch(req).then(function(r){
        var cp = r.clone(); caches.open(CACHE).then(function(c){ c.put(req, cp); });
        return r;
      }).catch(function(){
        return caches.match(req).then(function(r){ return r || caches.match('./index.html'); });
      })
    );
    return;
  }
  // ไฟล์อื่น (icon/manifest) -> cache ก่อนเพื่อความเร็ว
  e.respondWith(caches.match(req).then(function(r){ return r || fetch(req); }));
});
