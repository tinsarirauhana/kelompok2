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
    
    // Tampilkan popup saat hover
    marker.on('mouseover', function() {
      this.openPopup();
    });
    
    // Sembunyikan popup saat mouseout
    marker.on('mouseout', function() {
      this.closePopup();
    });
    
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

  filtered.forEach(function(m) {
    // Cari indeks asli dari markersData
    const originalIndex = markersData.findIndex(mosque => mosque.id === m.id);
    
    const item = document.createElement("div");
    item.classList.add("mosque-item");
    item.innerHTML = `
      <span class="mosque-name">${m.nama}</span>
      <div class="mosque-info">
        <i class="fas fa-map-marker-alt"></i>
        ${m.kota}
      </div>
    `;
    
    // Klik item: pindah ke marker dan buka popup
    item.addEventListener("click", function() {
      map.setView([m.lat, m.lng], 16);
      markers[originalIndex].openPopup();
    });
    
    // Hover item: tampilkan popup di map
    item.addEventListener("mouseover", function() {
      markers[originalIndex].openPopup();
    });
    
    // Mouseout item: sembunyikan popup
    item.addEventListener("mouseout", function() {
      markers[originalIndex].closePopup();
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

// State untuk tracking apakah semua masjid sedang ditampilkan
let isAllMosquesShown = true;

// Fungsi untuk menampilkan semua masjid
function showAllMosques() {
  // Tampilkan semua markers
  markers.forEach(marker => {
    marker.setOpacity(1);
  });

  // Reset sidebar ke daftar lengkap
  renderSidebar("");
  document.getElementById("searchInput").value = "";
  
  // Update button state
  isAllMosquesShown = true;
  updateShowAllButton();
  
  // Fit map ke bounds semua markers
  if (markers.length > 0) {
    const group = new L.featureGroup(markers);
    map.fitBounds(group.getBounds(), { padding: [50, 50] });
  }
}

// Fungsi untuk update tampilan tombol
function updateShowAllButton() {
  const btn = document.getElementById("showAllBtn");
  if (isAllMosquesShown) {
    btn.innerHTML = '<i class="fas fa-map-pin"></i> Tampilkan Semua Masjid';
  }
}

// Jalankan saat halaman siap
window.addEventListener("load", function() {
  loadMarkersToMap();
  isAllMosquesShown = true;

  // Show All Mosques functionality
  document.getElementById("showAllBtn").addEventListener("click", function() {
    showAllMosques();
  });

  // Search functionality
  document.getElementById("searchInput").addEventListener("input", function() {
    renderSidebar(this.value);
    if (this.value.length > 0) {
      isAllMosquesShown = false;
    } else {
      isAllMosquesShown = true;
    }
    updateShowAllButton();
  });
});

console.log("storage ready");