async function loadRecyclingPoints() {
    const list = document.getElementById('points-list');
    const status = document.getElementById('points-status');
    if (!list) return;

    list.textContent = '';
    if (status) {
        status.textContent = 'Cargando puntos de reciclaje...';
        status.className = 'points-status';
    }

    try {
        const points = await apiRequest('/recycling-points');

        if (status) status.textContent = '';

        if (!Array.isArray(points) || !points.length) {
            list.innerHTML = '<p class="points-empty">No hay puntos de reciclaje registrados aún.</p>';
            return;
        }

        const fragment = document.createDocumentFragment();

        points.forEach((point) => {
            const card = document.createElement('article');
            card.className = 'point-card';

            const title = document.createElement('h3');
            title.textContent = point.name || 'Punto sin nombre';

            const address = document.createElement('p');
            address.className = 'point-address';
            address.textContent = point.address || 'Sin dirección';

            const coords = document.createElement('p');
            coords.className = 'point-coords';
            coords.textContent = `Lat: ${point.latitude ?? 'N/A'} · Lng: ${point.longitude ?? 'N/A'}`;

            const material = document.createElement('p');
            material.className = 'point-material';
            material.textContent = `Material ID: ${point.materialId ?? 'N/A'}`;

            card.append(title, address, coords, material);
            fragment.appendChild(card);
        });

        list.appendChild(fragment);

    } catch (error) {
        if (status) {
            status.textContent = `No se pudieron cargar los puntos: ${error.message}`;
            status.classList.add('is-error');
        }
    }
}

function initPoints() {
    loadRecyclingPoints();
}

document.addEventListener('DOMContentLoaded', initPoints);
