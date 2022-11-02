if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js')
    .then((reg) => {
      // регистрация сработала
      console.log('Registration succeeded. Scope is ' + reg.scope);

      if(reg.installing) {
        console.log("serviceWorker: установка")
      } else if(reg.waiting) {
        console.log("serviceWorker: установлен")
      } else if(reg.active) {
        console.log("serviceWorker: активен")
      }
      
    }).catch((error) => {
      // регистрация прошла неудачно
      console.log('Registration failed with ' + error);
    });
}

// self.addEventListener('install', (event) => {
//   event.waitUntil(
//     caches.open('v1').then((cache) => {
//       return cache.addAll([
//         './cache/cache.html',
//         './cache/cache.css',
//         './cache/img/images.png',
//       ]);
//     })
//   );
// });