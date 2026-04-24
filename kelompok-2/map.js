var map = L.map('map').setView([-6.2, 106.8], 13);

// Tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
}).addTo(map);

// Dummy update UI (biar keliatan hidup)
let markerCount = 0;
const markerCountEl = document.getElementById("marker-count");

// contoh event klik (nanti bisa diambil alih temen logic)
map.on('click', function() {
  markerCount++;
  markerCountEl.textContent = markerCount;
});

// tombol reset (UI dulu, logic bisa disambung nanti)
document.getElementById("resetBtn").addEventListener("click", function() {
  markerCount = 0;
  markerCountEl.textContent = markerCount;
});