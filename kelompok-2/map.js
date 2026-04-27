// ===== KONFIGURASI PETA =====
// Inisialisasi peta Leaflet dengan elemen HTML dengan id="map"
// setView: menentukan koordinat pusat (-6.2, 106.8) dan zoom level 13
var map = L.map("map").setView([5.5502, 95.3182], 13);

// Tile layer: menambahkan layer peta dari OpenStreetMap
// Ini menampilkan peta dasar dengan rute jalan dan informasi geografis
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap",
}).addTo(map);