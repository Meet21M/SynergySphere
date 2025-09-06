import { storage } from './storage.js';
import { getCurrentUser, requireAuth } from './auth.js';
import { qs } from './utils.js';
import { mountNavbar } from './navbar.js';

requireAuth();
mountNavbar();

const user = getCurrentUser();
const form = qs('#profileForm');

form.name.value = user.name || '';
form.email.value = user.email || '';

form.addEventListener('submit', (e)=>{
  e.preventDefault();
  const users = storage.getUsers();
  const idx = users.findIndex(u=>u.id === user.id);
  users[idx] = { ...users[idx], name: form.name.value.trim() || users[idx].name };
  storage.saveUsers(users);
  alert('Profile updated');
});
