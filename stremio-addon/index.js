const { addonBuilder } = require('stremio-addon-sdk');
const express = require('express');

// Definisikan manifest addon
const manifest = {
    "id": "org.example.myaddon",
    "version": "1.0.0",
    "name": "My Stremio Addon",
    "description": "Example Stremio addon hosted on GitHub",
    "resources": ["catalog", "meta", "stream"],
    "types": ["movie", "series"],
    "catalogs": []
};

const builder = new addonBuilder(manifest);

// Contoh handler untuk stream
builder.defineStreamHandler(function(args) {
    // Logika untuk memberikan stream
    return Promise.resolve({ streams: [] });
});

// Bangun addon
const addonInterface = builder.getInterface();

// Buat server Express
const app = express();
app.get('/', (_, res) => {
    res.redirect(manifest.id + '/manifest.json');
});
app.use(manifest.id, addonInterface);

const port = process.env.PORT || 7000;
app.listen(port, () => console.log(`Addon aktif di http://localhost:${port}`));