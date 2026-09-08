/**
 * Módulo de Gestión de Recompensas y Logros para EcoPoint
 */

function checkUserAuthentication() {
  const tokenKey = window.AUTH_TOKEN_KEY || 'ecopoint_token';
  return Boolean(localStorage.getItem(tokenKey));
}

function loadRewards() {
  // Comprobamos la autenticación leyendo el token guardado
  const tokenKey = window.AUTH_TOKEN_KEY || 'ecopoint_token';
  const isAuthenticated = Boolean(localStorage.getItem(tokenKey));

  if (isAuthenticated) {
    initRewards();
  } else {
    console.log('Usuario invitado: mostrando recompensas generales');
    renderGuestRewards();
  }
}

function initRewards() {
  const userStr = localStorage.getItem('ecopoint_user');
  const user = userStr ? JSON.parse(userStr) : null;

  const pointsCard = document.getElementById('user-points-card');
  const pointsTotal = document.getElementById('user-points-total');
  const progressBar = document.getElementById('user-points-progress');
  const progressText = document.getElementById('user-points-progress-text');

  if (pointsCard) pointsCard.hidden = false;

  const currentPoints = user ? (user.points || 350) : 350;
  if (pointsTotal) pointsTotal.textContent = currentPoints;

  if (progressBar) {
    const percentage = Math.min((currentPoints / 1000) * 100, 100);
    progressBar.style.width = `${percentage}%`;
  }

  if (progressText) {
    progressText.textContent = `${currentPoints} / 1000 Puntos para la siguiente medalla`;
  }

  renderMedalsGrid();
}

function renderGuestRewards() {
  const pointsCard = document.getElementById('user-points-card');
  if (pointsCard) pointsCard.hidden = true;
  renderMedalsGrid();
}

function renderMedalsGrid() {
  const medalsGrid = document.getElementById('medals-grid');
  if (!medalsGrid) return;

  medalsGrid.innerHTML = `
    <div style="display: flex; gap: 15px; margin-top: 10px; flex-wrap: wrap;">
      <div title="Reciclador Novato" style="text-align: center;">
        <span style="font-size: 2rem;">🌱</span>
        <p style="margin: 5px 0 0; font-size: 0.8rem;">Novato</p>
      </div>
      <div title="Guardián Verde" style="text-align: center;">
        <span style="font-size: 2rem;">♻️</span>
        <p style="margin: 5px 0 0; font-size: 0.8rem;">Guardián</p>
      </div>
      <div title="Héroe Ecológico" style="text-align: center; opacity: 0.4;">
        <span style="font-size: 2rem;">🏆</span>
        <p style="margin: 5px 0 0; font-size: 0.8rem;">Bloqueado</p>
      </div>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', loadRewards);