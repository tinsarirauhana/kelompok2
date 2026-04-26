// storage.js
// Kontributor: Tinsari (Data & Testing)

const STORAGE_KEY = "markers_masjid";

function saveMarkers(markersArray) {
  const data = markersArray.map(m => ({
    lat: m.getLatLng().lat,
    lng: m.getLatLng().lng,
    nama: m.getPopup() ? m.getPopup().getContent() : "Masjid"
  }));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  console.log("Data tersimpan:", data.length, "marker");
}

function loadMarkers() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    const data = JSON.parse(saved);
    console.log("Data dimuat:", data.length, "marker");
    return data;
  }
  return [];
}

function clearMarkers() {
  localStorage.removeItem(STORAGE_KEY);
  console.log("Data dihapus");
}

console.log("storage ready");