// Definición de propiedad global dinámica para estado de autenticación
Object.defineProperty(window, 'isLoggedIn', {
  get: function() {
    const tokenKey = window.AUTH_TOKEN_KEY || 'ecopoint_token';
    return Boolean(localStorage.getItem(tokenKey) || localStorage.getItem('ecopoint_user'));
  },
  configurable: true
});

function initAuth() {
  const tabs = document.querySelectorAll('[data-auth-tab]');
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const authPanel = document.getElementById('auth-panel');
  const profilePanel = document.getElementById('profile-panel');
  const profileInfo = document.getElementById('profile-info');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const mode = tab.dataset.authTab;
      if (mode === 'login') {
        loginForm.hidden = false;
        registerForm.hidden = true;
      } else {
        loginForm.hidden = true;
        registerForm.hidden = false;
      }
    });
  });

  const checkSession = () => {
    const user = JSON.parse(localStorage.getItem('ecopoint_user'));
    if (user) {
      authPanel.hidden = true;
      profilePanel.hidden = false;
      profileInfo.innerHTML = `
        <p><strong>Nombre:</strong> ${user.name}</p>
        <p><strong>Correo:</strong> ${user.email}</p>
        <button id="logout-btn" class="btn btn-submit" style="margin-top: 15px; background: #c62828;">Cerrar sesión</button>
      `;
      document.getElementById('logout-btn').addEventListener('click', () => {
        localStorage.removeItem('ecopoint_user');
        localStorage.removeItem(window.AUTH_TOKEN_KEY);
        location.reload();
      });
    }
  };

  loginForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const user = { name: email.split('@')[0], email };
    localStorage.setItem('ecopoint_user', JSON.stringify(user));
    localStorage.setItem(window.AUTH_TOKEN_KEY, 'mock_jwt_token');
    checkSession();
  });

  registerForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const user = { name, email };
    localStorage.setItem('ecopoint_user', JSON.stringify(user));
    localStorage.setItem(window.AUTH_TOKEN_KEY, 'mock_jwt_token');
    checkSession();
  });

  checkSession();
}