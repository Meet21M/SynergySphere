// LocalStorage data layer (can be swapped to API later)
const LS = {
  users: 'ss_users',
  currentUserId: 'ss_current_user_id',
  projects: 'ss_projects',
  tasks: 'ss_tasks',
};

const read = (k, fallback) => {
  try { return JSON.parse(localStorage.getItem(k)) ?? fallback; } catch { return fallback; }
};
const write = (k, v) => localStorage.setItem(k, JSON.stringify(v));

// Seed if empty
(function seed() {
  const users = read(LS.users, []);
  const projects = read(LS.projects, []);
  const tasks = read(LS.tasks, []);
  if(users.length === 0) {
    const u1 = { id: 'u_demo', email:'demo@synergy.com', password:'demo123', name:'Demo User' };
    write(LS.users, [u1]);
    const p1 = { id:'p_demo', name:'Website Revamp', members:['u_demo'] };
    const p2 = { id:'p_data', name:'Data Cleanup', members:['u_demo'] };
    write(LS.projects, [p1,p2]);
    const t1 = { id:'t1', projectId:'p_demo', title:'Design header', description:'New navbar + hero', assigneeId:'u_demo', dueDate:new Date(Date.now()+86400000).toISOString(), status:'Todo' };
    const t2 = { id:'t2', projectId:'p_demo', title:'Implement footer', description:'Links + socials', assigneeId:'u_demo', dueDate:new Date(Date.now()+3*86400000).toISOString(), status:'In Progress' };
    write(LS.tasks, [t1,t2]);
  }
})();

export const storage = {
  // auth
  currentUserId: () => localStorage.getItem(LS.currentUserId),
  setCurrentUserId: (id) => localStorage.setItem(LS.currentUserId, id),
  clearCurrentUser: () => localStorage.removeItem(LS.currentUserId),

  getUsers: () => read(LS.users, []),
  saveUsers: (arr) => write(LS.users, arr),

  getProjects: () => read(LS.projects, []),
  saveProjects: (arr) => write(LS.projects, arr),

  getTasks: () => read(LS.tasks, []),
  saveTasks: (arr) => write(LS.tasks, arr),
};
