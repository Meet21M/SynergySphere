import { storage } from './storage.js';
import { getCurrentUser, requireAuth } from './auth.js';
import { qs, qsa, uid, formatDate, initials } from './utils.js';
import { mountNavbar } from './navbar.js';

requireAuth();
mountNavbar();

const params = new URLSearchParams(location.search);
const projectId = params.get('id');
const user = getCurrentUser();

const titleEl = qs('#projectTitle');
const taskList = qs('#taskList');
const empty = qs('#taskEmpty');
const assigneeSelect = qs('#taskAssignee');

function loadProject() {
  const project = storage.getProjects().find(p => p.id === projectId && p.members.includes(user.id));
  if(!project) { alert('Project not found or access denied'); window.location.href='dashboard.html'; return null; }
  titleEl.textContent = project.name;
  // Populate members as assignees (for now only current user is member unless seeded)
  assigneeSelect.innerHTML = '';
  const users = storage.getUsers().filter(u => project.members.includes(u.id));
  users.forEach(u=>{
    const opt = document.createElement('option');
    opt.value = u.id; opt.textContent = u.name + ` (${u.email})`;
    assigneeSelect.appendChild(opt);
  });
  return project;
}

function renderTasks() {
  const tasks = storage.getTasks().filter(t => t.projectId === projectId);
  taskList.innerHTML = '';
  if(tasks.length === 0) {
    empty.classList.remove('d-none');
    return;
  }
  empty.classList.add('d-none');
  tasks.forEach(t=>{
    const u = storage.getUsers().find(x=>x.id === t.assigneeId);
    const li = document.createElement('div');
    li.className = 'card card-hover mb-2';
    li.innerHTML = `
      <div class="card-body d-flex align-items-center justify-content-between">
        <div class="d-flex align-items-center gap-3">
          <span class="badge-avatar">${initials(u?.name || '?')}</span>
          <div>
            <div class="fw-semibold text-light">${t.title}</div>
            <div class="small text-secondary">Assignee: ${u?.name || '—'} • Due: ${formatDate(t.dueDate)} • Status: ${t.status}</div>
          </div>
        </div>
        <a href="task.html?id=${encodeURIComponent(t.id)}" class="btn btn-outline-light btn-sm">View</a>
      </div>`;
    taskList.appendChild(li);
  });
}

const project = loadProject();
renderTasks();

// Create Task
qs('#createTaskForm')?.addEventListener('submit', (e)=>{
  e.preventDefault();
  const f = e.target;
  const title = f.title.value.trim();
  const description = f.description.value.trim();
  const assigneeId = f.assignee.value;
  const dueDate = f.dueDate.value ? new Date(f.dueDate.value).toISOString() : null;
  if(!title) { alert('Title is required'); return; }
  const tasks = storage.getTasks();
  tasks.push({ id: uid(), projectId, title, description, assigneeId, dueDate, status:'Todo' });
  storage.saveTasks(tasks);
  f.reset();
  bootstrap.Modal.getInstance(document.getElementById('taskModal'))?.hide();
  renderTasks();
});
