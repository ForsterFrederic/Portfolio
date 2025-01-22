self.addEventListener("fetch", (event) => {
    if (event.request.method === "POST" || event.request.method === "PUT") {
        return fetch(event.request); // Bypass cache for POST/PUT requests
    }
    event.respondWith(
        caches.match(event.request).then((response) => response || fetch(event.request)) // Cache other requests
    );
});