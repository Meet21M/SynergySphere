import { storage } from './storage.js';
import { getCurrentUser, requireAuth } from './auth.js';
import { qs, formatDate } from './utils.js';
import { mountNavbar } from './navbar.js';

requireAuth();
mountNavbar();

const params = new URLSearchParams(location.search);
const taskId = params.get('id');

const titleEl = qs('#taskTitle');
const descEl = qs('#taskDesc');
const dueEl = qs('#taskDue');
const assigneeEl = qs('#taskAssignee');
const statusEl = qs('#taskStatus');

let task, project;

function load() {
  const tasks = storage.getTasks();
  task = tasks.find(t => t.id === taskId);
  if(!task) { alert('Task not found'); window.location.href='dashboard.html'; return; }
  project = storage.getProjects().find(p => p.id === task.projectId);
  if(!project) { alert('Project missing'); window.location.href='dashboard.html'; return; }

  // Fill fields
  qs('#projectLink').href = `project.html?id=${encodeURIComponent(project.id)}`;
  qs('#projectLink').textContent = project.name;

  titleEl.value = task.title;
  descEl.value = task.description || '';
  dueEl.value = task.dueDate ? task.dueDate.slice(0,10) : '';
  statusEl.value = task.status;

  const users = storage.getUsers().filter(u => project.members.includes(u.id));
  assigneeEl.innerHTML = '';
  users.forEach(u=>{
    const opt = document.createElement('option');
    opt.value = u.id; opt.textContent = `${u.name} (${u.email})`;
    assigneeEl.appendChild(opt);
  });
  assigneeEl.value = task.assigneeId || '';
}

load();

qs('#taskForm')?.addEventListener('submit', (e)=>{
  e.preventDefault();
  const tasks = storage.getTasks();
  const idx = tasks.findIndex(t => t.id === taskId);
  if(idx === -1) return;
  tasks[idx] = {
    ...tasks[idx],
    title: titleEl.value.trim(),
    description: descEl.value.trim(),
    dueDate: dueEl.value ? new Date(dueEl.value).toISOString() : null,
    assigneeId: assigneeEl.value,
    status: statusEl.value,
  };
  storage.saveTasks(tasks);
  alert('Task saved');
});
