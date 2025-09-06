import { storage } from './storage.js';
import { getCurrentUser, requireAuth } from './auth.js';
import { qs, uid } from './utils.js';
import { mountNavbar } from './navbar.js';

requireAuth();
mountNavbar();

const user = getCurrentUser();
const list = qs('#projectList');
const empty = qs('#projectEmpty');

function render() {
  const projects = storage.getProjects().filter(p => p.members.includes(user.id));
  list.innerHTML = '';
  if(projects.length === 0) {
    empty.classList.remove('d-none');
    return;
  }
  empty.classList.add('d-none');
  projects.forEach(p => {
    const card = document.createElement('div');
    card.className = 'card card-hover';
    card.innerHTML = `
      <div class="card-body d-flex align-items-center justify-content-between">
        <div>
          <h5 class="card-title mb-1 text-light">${p.name}</h5>
          <div class="text-secondary small">${p.members.length} member(s)</div>
        </div>
        <a href="project.html?id=${encodeURIComponent(p.id)}" class="btn btn-primary">Open</a>
      </div>`;
    list.appendChild(card);
  });
}

render();

// create project
qs('#createProjectForm')?.addEventListener('submit', (e)=>{
  e.preventDefault();
  const name = e.target.name.value.trim();
  if(!name) return;
  const projects = storage.getProjects();
  projects.push({ id: uid(), name, members:[user.id] });
  storage.saveProjects(projects);
  e.target.reset();
  const modal = bootstrap.Modal.getInstance(document.getElementById('projectModal'));
  modal?.hide();
  render();
});
