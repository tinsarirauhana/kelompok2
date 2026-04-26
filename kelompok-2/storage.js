// storage.js
// Kontributor: Tinsari (Data & Testing)

const STORAGE_KEY = "markers_masjid";

// Load data dari markersData dan tampilkan di peta
function loadMarkersToMap() {
  if (typeof markersData === "undefined") return;

  markersData.forEach(function(m) {
    const marker = L.marker([m.lat, m.lng]).addTo(map);
    marker.bindPopup(`
      <b>${m.nama}</b><br>
      <small>${m.kota}</small><br>
      <small>Lat: ${m.lat}, Lng: ${m.lng}</small>
    `);
    markers.push(marker);
  });

  updateMarkerCount();
  renderSidebar();
  console.log("Data masjid dimuat:", markersData.length, "titik");
}

// Render daftar masjid di sidebar
function renderSidebar(filter = "") {
  const mosqueList = document.getElementById("mosqueList");
  mosqueList.innerHTML = "";

  const filtered = markersData.filter(m =>
    m.nama.toLowerCase().includes(filter.toLowerCase())
  );

  filtered.forEach(function(m, i) {
    const item = document.createElement("div");
    item.classList.add("mosque-item");
    item.innerHTML = `
      <span class="mosque-name">${m.nama}</span>
      <div class="mosque-info">
        <i class="fas fa-map-marker-alt"></i>
        ${m.kota}
      </div>
    `;
    item.addEventListener("click", function() {
      map.setView([m.lat, m.lng], 16);
      markers[i].openPopup();
    });
    mosqueList.appendChild(item);
  });
}

// Simpan ke localStorage
function saveMarkers(markersArray) {
  const data = markersArray.map(m => ({
    lat: m.getLatLng().lat,
    lng: m.getLatLng().lng,
  }));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// Jalankan saat halaman siap
window.addEventListener("load", function() {
  loadMarkersToMap();

  // Search functionality
  document.getElementById("searchInput").addEventListener("input", function() {
    renderSidebar(this.value);
  });
});

console.log("storage ready");