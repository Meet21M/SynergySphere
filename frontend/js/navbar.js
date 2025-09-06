import { getCurrentUser, logout } from './auth.js';

export function mountNavbar() {
  const root = document.getElementById('navbar-root');
  const user = getCurrentUser();
  const name = user?.name ?? 'Guest';
  const email = user?.email ?? '';
  root.innerHTML = `
  <nav class="navbar navbar-expand-lg sticky-top">
    <div class="container">
      <a class="navbar-brand text-light" href="dashboard.html">SynergySphere</a>
      <button class="navbar-toggler text-light" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navMenu">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item"><a class="nav-link text-light" href="dashboard.html">Projects</a></li>
          <li class="nav-item"><a class="nav-link text-light" href="profile.html">Profile</a></li>
        </ul>
        <div class="d-flex align-items-center gap-3">
          <div class="text-end small">
            <div class="text-light">${name}</div>
            <div class="text-secondary">${email}</div>
          </div>
          <button id="btnLogout" class="btn btn-outline-light btn-sm">Logout</button>
        </div>
      </div>
    </div>
  </nav>
  `;
  document.getElementById('btnLogout')?.addEventListener('click', logout);
}
