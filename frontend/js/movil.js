// === GEOLOCALIZACIÓN ===
function obtenerUbicacion() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        alert(`Ubicación detectada:\nLatitud: ${latitude}\nLongitud: ${longitude}`);
      },
      (err) => {
        alert('Error al acceder a la ubicación. Verifica los permisos.');
      },
      { enableHighAccuracy: true }
    );
  } else {
    alert('Navegador no compatible con geolocalización.');
  }
}

// === CÁMARA ===
async function iniciarCamara() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
    const video = document.getElementById('camara-preview');
    if (video) {
      video.srcObject = stream;
      video.play();
    }
  } catch (err) {
    alert('No se pudo acceder a la cámara.');
  }
}