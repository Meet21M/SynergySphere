# SynergySphere - Mobile Application MVP

SynergySphere is a lightweight **project and task management mobile-friendly web app** designed for accessibility and quick interactions.  
This MVP (Minimum Viable Product) focuses on providing **intuitive, user-friendly interfaces** and **core features** to manage projects and tasks on the go.

---

## 🚀 Tech Stack

- **Frontend:** HTML, CSS, JavaScript, Bootstrap  
- **Backend:** FastAPI (Python-based high-performance API framework)  
- **Database:** PostgreSQL  
- **Deployment/Hosting:** Can be deployed on platforms like Render, Railway, or Heroku for backend + Vercel/Netlify for frontend  

---

## 📱 Wireframe Overview

### 1. **Login / Sign Up Screen**
- **Description:** Standard authentication system.  
- **Features:**  
  - Email & Password fields  
  - Login button  
  - "Sign Up" link → registration form (email, password, name)  
  - "Forgot Password" option  
- **UI Elements:** App logo, inputs, buttons/links  

---

### 2. **Project List / Dashboard Screen**
- **Description:** Displays all projects of the logged-in user.  
- **Features:**  
  - List of projects with name & summary  
  - Floating "+" button to create a new project  
- **UI Elements:** Header with logo/title, clickable project cards  

---

### 3. **Project Detail View**
- **Description:** Hub for a specific project.  
- **Features:**  
  - Displays project details  
  - Entry point to **Task List/Board**  

---

### 4. **Task List / Board View**
- **Description:** Displays all tasks under the selected project.  
- **Features:**  
  - Task cards with **title, assignee, due date**  
  - "+" button to add new tasks  
- **UI Elements:** Scrollable task list or simple Kanban-style board  

---

### 5. **Task Creation Modal**
- **Description:** Form to create a new task.  
- **Fields:**  
  - Task Title  
  - Description (multi-line)  
  - Assignee (dropdown of project members)  
  - Due Date (date picker)  
- **Actions:** Save / Cancel buttons  

---

### 6. **Task Detail View**
- **Description:** Detailed view of a selected task.  
- **Features:**  
  - Title, description, assignee, due date  
  - Editable status dropdown (e.g., Pending, In-Progress, Done)  
  - Edit option for fields  

---

### 7. **User Profile / Settings Screen**
- **Description:** Basic profile management & preferences.  
- **Features:**  
  - Displays user's **name & email**  
  - Logout option  
  - Notification toggle (on/off)  

---

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/Meet21M/synergysphere.git
cd synergysphere
