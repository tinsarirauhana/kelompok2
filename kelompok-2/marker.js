// marker.js

let markers = [];

function handleMapClick(e) {
  const lat = e.latlng.lat;
  const lng = e.latlng.lng;

  // tambah marker ke map
  const marker = L.marker([lat, lng]).addTo(map);

  // popup sederhana
  marker.bindPopup(`
    <b>Marker Baru</b><br>
    Lat: ${lat.toFixed(5)}<br>
    Lng: ${lng.toFixed(5)}
  `);

  // simpan marker ke array
  markers.push(marker);

  // update counter
  updateMarkerCount();

  // tambah ke sidebar
  addMarkerToSidebar(lat, lng);
}

map.on("click", handleMapClick);

function updateMarkerCount() {
  const markerCountEl = document.getElementById("marker-count");
  markerCountEl.textContent = markers.length;
}

