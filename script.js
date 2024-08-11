// Inicializar el mapa
var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Añadir el buscador de lugares
L.Control.geocoder().addTo(map);

// Array para guardar los marcadores
var markers = [];

// Función para guardar los pines en localStorage
function saveMarkers() {
  var markersData = markers.map(marker => ({
    lat: marker.getLatLng().lat,
    lng: marker.getLatLng().lng
  }));
  localStorage.setItem('markers', JSON.stringify(markersData));
  alert('Pines guardados correctamente.');
}

// Función para cargar los pines desde localStorage
function loadMarkers() {
  var markersData = JSON.parse(localStorage.getItem('markers'));
  if (markersData) {
    markers.forEach(marker => marker.remove()); // Eliminar los marcadores actuales
    markers = []; // Limpiar el array de marcadores
    markersData.forEach(data => {
      var marker = L.marker([data.lat, data.lng]).addTo(map);
      markers.push(marker);
    });
  } else {
    alert('No hay pines guardados.');
  }
}

// Función para añadir un pin (sin aviso)
function addMarker(e) {
  var marker = L.marker(e.latlng).addTo(map);
  markers.push(marker);
}

// Función para borrar todos los pines
function clearMarkers() {
  markers.forEach(marker => marker.remove()); // Eliminar todos los marcadores del mapa
  markers = []; // Limpiar el array de marcadores
  localStorage.removeItem('markers'); // Eliminar los datos de marcadores de localStorage
}

// Asignar funciones a los botones
document.getElementById('saveMarkersButton').addEventListener('click', saveMarkers);
document.getElementById('loadMarkersButton').addEventListener('click', loadMarkers);
document.getElementById('addMarkerButton').addEventListener('click', function() {
  map.once('click', addMarker);
});
document.getElementById('clearMarkersButton').addEventListener('click', clearMarkers);
