const cacheList = [
  './cache/cache.html',
  './cache/cache.css',
  './cache/cache2.css',
  './cache/img/images.png',
]

const cacheName = "cache-1"

// Рабочий install
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        console.log(cache)
        return cache.addAll(cacheList)
      })
  ); 
});

self.addEventListener('activate', (event) => {
  var cacheKeeplist = [cacheName];

  event.waitUntil(
    caches.keys()
      .then((keyList) => {
        console.log("keyList: ",keyList)
        return Promise.all(keyList.map((key) => {
          if (cacheKeeplist.indexOf(key) === -1) {
            return caches.delete(key);
          }
        }));
      })
  );
});

// рабочий fetch
// self.addEventListener('fetch', (event) => {
//   testOnline()
//   event.respondWith(
//     caches.match(event.request)
//       .then((response) => {
//         if(response) {
//           return response
//         }

//         return fetch(event.request)
//       })
//   )
// });

self.addEventListener('fetch', (event) => {

  event.respondWith(
    caches.match(event.request)
    .then((response) => {

      if(response) {
        return response
      }

      if(navigator.onLine) {
        return fetch(event.request)
      } else {
        return caches.match(cacheList[0])
      }
      
    })   
  )

});



// setInterval(async () => {

//   if(navigator.onLine) {
//     console.log("online")
//   }

//   if(!navigator.onLine) {
//     console.log("НЕ online")

//     self.addEventListener('fetch', (event) => {

//       console.log('2 fetch')
    
//     });
//   }

// }, 2000)


  // event.waitUntil(
    // cacheList.forEach(cacheItem => {
      // event.waitUntil(
      //   caches
      //     .open('v1')
      //     .then((cache) => {
      //       console.log(cache)
      //       return cache.add(cacheItem)
      //     })
      // );  
    // })
  // )