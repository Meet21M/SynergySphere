import { storage } from './storage.js';
import { qs } from './utils.js';

export function requireAuth() {
  if(!storage.currentUserId()) {
    window.location.href = 'index.html';
  }
}

export function getCurrentUser() {
  const id = storage.currentUserId();
  if(!id) return null;
  return storage.getUsers().find(u => u.id === id) || null;
}

export function logout() {
  storage.clearCurrentUser();
  window.location.href = 'index.html';
}

export function handleLogin(form) {
  form?.addEventListener('submit', (e)=>{
    e.preventDefault();
    const email = form.email.value.trim().toLowerCase();
    const password = form.password.value;
    const user = storage.getUsers().find(u => u.email.toLowerCase() === email && u.password === password);
    if(!user) {
      qs('#loginHelp').textContent = 'Invalid email or password';
      qs('#loginHelp').classList.remove('d-none');
      return;
    }
    storage.setCurrentUserId(user.id);
    window.location.href = 'dashboard.html';
  });
}

export function handleSignup(form) {
  form?.addEventListener('submit', (e)=>{
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim().toLowerCase();
    const password = form.password.value;
    if(password.length < 6) { alert('Password must be at least 6 characters.'); return; }
    const users = storage.getUsers();
    if(users.some(u => u.email.toLowerCase() === email)) { alert('Email already registered.'); return; }
    const id = crypto.randomUUID ? crypto.randomUUID() : 'u_' + Date.now();
    users.push({ id, name: name || email.split('@')[0], email, password });
    storage.saveUsers(users);
    storage.setCurrentUserId(id);
    window.location.href = 'dashboard.html';
  });
}
