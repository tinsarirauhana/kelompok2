// marker.js

console.log("marker logic ready");

// fungsi saat map diklik
function handleMapClick(e) {
  console.log("Koordinat:", e.latlng);
}

// event klik pada map
map.on("click", handleMapClick);
