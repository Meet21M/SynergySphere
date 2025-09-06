// Mock data
let users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
let projects = JSON.parse(localStorage.getItem('projects')) || [];
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentProjectId = null;
let currentTaskId = null;

// Login form
if (document.getElementById('login-form')) {
    document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            window.location.href = 'dashboard.html';
        } else {
            alert('Invalid credentials');
        }
    });
}

// Signup form
if (document.getElementById('signup-form')) {
    document.getElementById('signup-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        
        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
            alert('User already exists');
            return;
        }
        
        const newUser = { id: Date.now(), name, email, password };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        currentUser = newUser;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        window.location.href = 'dashboard.html';
    });
}

// Load projects
function loadProjects() {
    if (!document.getElementById('projects-list')) return;
    const projectsList = document.getElementById('projects-list');
    projectsList.innerHTML = '';
    
    const userProjects = projects.filter(p => p.userId === currentUser.id);
    userProjects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'col-md-4 project-card';
        projectCard.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${project.name}</h5>
                    <p class="card-text">${project.description || 'No description'}</p>
                </div>
            </div>
        `;
        projectCard.addEventListener('click', () => {
            currentProjectId = project.id;
            localStorage.setItem('currentProjectId', currentProjectId);
            window.location.href = 'project-detail.html';
        });
        projectsList.appendChild(projectCard);
    });
}

// Load project detail
function loadProjectDetail() {
    if (!document.getElementById('project-name')) return;
    currentProjectId = localStorage.getItem('currentProjectId');
    const project = projects.find(p => p.id == currentProjectId);
    if (project) {
        document.getElementById('project-title').textContent = project.name;
        document.getElementById('project-name').textContent = project.name;
        document.getElementById('project-description').textContent = project.description || 'No description';
    }
}

// View tasks button
if (document.getElementById('view-tasks-btn')) {
    document.getElementById('view-tasks-btn').addEventListener('click', () => {
        window.location.href = 'task-list.html';
    });
}

// Load tasks
function loadTasks() {
    if (!document.getElementById('tasks-list')) return;
    const tasksList = document.getElementById('tasks-list');
    tasksList.innerHTML = '';
    
    currentProjectId = localStorage.getItem('currentProjectId');
    const projectTasks = tasks.filter(t => t.projectId == currentProjectId);
    projectTasks.forEach(task => {
        const taskCard = document.createElement('div');
        taskCard.className = 'card task-card mb-3';
        taskCard.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${task.title}</h5>
                <p class="card-text">${task.description || 'No description'}</p>
                <p><small>Assignee: ${task.assignee} | Due: ${task.dueDate || 'N/A'}</small></p>
            </div>
        `;
        taskCard.addEventListener('click', () => {
            currentTaskId = task.id;
            localStorage.setItem('currentTaskId', currentTaskId);
            window.location.href = 'task-detail.html';
        });
        tasksList.appendChild(taskCard);
    });
}

// Add project modal
if (document.getElementById('add-project-btn')) {
    document.getElementById('add-project-btn').addEventListener('click', () => {
        const modal = new bootstrap.Modal(document.getElementById('add-project-modal'));
        modal.show();
    });
}

if (document.getElementById('add-project-form')) {
    document.getElementById('add-project-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('project-name-input').value;
        const description = document.getElementById('project-description-input').value;
        
        const newProject = {
            id: Date.now(),
            name,
            description,
            userId: currentUser.id
        };
        projects.push(newProject);
        localStorage.setItem('projects', JSON.stringify(projects));
        
        const modal = bootstrap.Modal.getInstance(document.getElementById('add-project-modal'));
        modal.hide();
        loadProjects();
    });
}

// Add task modal
if (document.getElementById('add-task-btn')) {
    document.getElementById('add-task-btn').addEventListener('click', () => {
        const modal = new bootstrap.Modal(document.getElementById('add-task-modal'));
        modal.show();
    });
}

if (document.getElementById('add-task-form')) {
    document.getElementById('add-task-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('task-title-input').value;
        const description = document.getElementById('task-description-input').value;
        const assignee = document.getElementById('task-assignee-input').value;
        const dueDate = document.getElementById('task-due-date-input').value;
        
        const newTask = {
            id: Date.now(),
            title,
            description,
            assignee,
            dueDate,
            status: 'pending',
            projectId: currentProjectId
        };
        tasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        
        const modal = bootstrap.Modal.getInstance(document.getElementById('add-task-modal'));
        modal.hide();
        loadTasks();
    });
}

// Load task detail
function loadTaskDetail() {
    if (!document.getElementById('task-title')) return;
    currentTaskId = localStorage.getItem('currentTaskId');
    const task = tasks.find(t => t.id == currentTaskId);
    if (task) {
        document.getElementById('task-detail-title').textContent = task.title;
        document.getElementById('task-title').textContent = task.title;
        document.getElementById('task-description').textContent = task.description || 'No description';
        document.getElementById('task-assignee').textContent = task.assignee;
        document.getElementById('task-due-date').textContent = task.dueDate || 'N/A';
        document.getElementById('task-status').value = task.status || 'pending';
    }
}

// Edit task
if (document.getElementById('edit-task-btn')) {
    document.getElementById('edit-task-btn').addEventListener('click', () => {
        const task = tasks.find(t => t.id == localStorage.getItem('currentTaskId'));
        if (task) {
            task.status = document.getElementById('task-status').value;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            alert('Task updated');
        }
    });
}

// Load profile
function loadProfile() {
    if (!document.getElementById('user-name')) return;
    document.getElementById('user-name').textContent = currentUser.name;
    document.getElementById('user-email').textContent = currentUser.email;
    // Load notification preference from localStorage or default to true
    const notifications = localStorage.getItem('notifications') === 'true';
    document.getElementById('notifications-toggle').checked = notifications;
}

// Logout
function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

if (document.getElementById('logout-btn')) {
    document.getElementById('logout-btn').addEventListener('click', logout);
}

// Notifications toggle
if (document.getElementById('notifications-toggle')) {
    document.getElementById('notifications-toggle').addEventListener('change', (e) => {
        localStorage.setItem('notifications', e.target.checked);
    });
}

// Initialize page-specific functions
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.endsWith('dashboard.html')) {
        loadProjects();
    } else if (window.location.pathname.endsWith('project-detail.html')) {
        loadProjectDetail();
    } else if (window.location.pathname.endsWith('task-list.html')) {
        loadTasks();
    } else if (window.location.pathname.endsWith('task-detail.html')) {
        loadTaskDetail();
    } else if (window.location.pathname.endsWith('profile.html')) {
        loadProfile();
    }
});
