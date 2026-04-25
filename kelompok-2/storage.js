// storage.js

let markers = [];

function addData(lat, lng, nama = "") {
  const data = { lat, lng, nama };
  markers.push(data);
  localStorage.setItem("markers", JSON.stringify(markers));
  console.log("Data tersimpan:", data);
}

function loadData() {
  const saved = localStorage.getItem("markers");
  if (saved) {
    markers = JSON.parse(saved);
    console.log("Data dimuat:", markers.length, "titik");
  }
  return markers;
}

function clearData() {
  markers = [];
  localStorage.removeItem("markers");
  console.log("Data dihapus");
}