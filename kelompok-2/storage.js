// menyimpan data marker sementara (masih basic)
let markers = [];

function addData(lat, lng) {
  markers.push({ lat, lng });
  console.log("Data masuk:", markers);
}