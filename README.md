# SynergySphere Full-Stack Web Application

This is a full-stack web application built with:
- Frontend: HTML, CSS, JavaScript (Vanilla JS)
- Backend: FastAPI (Python)
- Database: PostgreSQL

## Project Structure

```
SynergySphere/
├── .env
├── .gitignore
├── README.md
├── frontend/
│   ├── assets/
│   │   ├── css/
│   │   │   └── styles.css
│   │   ├── js/
│   │   │   └── app.js
│   │   └── images/
│   ├── index.html
│   └── pages/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── api/
│   │   │   ├── __init__.py
│   │   │   ├── routes/
│   │   │   │   ├── __init__.py
│   │   │   │   └── items.py
│   │   │   ├── models/
│   │   │   │   ├── __init__.py
│   │   │   │   └── item.py
│   │   │   └── schemas/
│   │   │       ├── __init__.py
│   │   │       └── item.py
│   │   ├── core/
│   │   │   ├── __init__.py
│   │   │   ├── config.py
│   │   │   └── database.py
│   │   ├── services/
│   │   │   ├── __init__.py
│   │   │   └── item_service.py
│   │   └── utils/
│   │       ├── __init__.py
│   │       └── helpers.py
│   ├── main.py
│   ├── requirements.txt
│   └── tests/
│       └── test_main.py
├── database/
│   ├── migrations/
│   │   └── 001_initial.sql
│   ├── scripts/
│   │   └── init_db.py
│   └── models/
│       └── item.sql
└── docs/
    └── api.md
```

## Folder Responsibilities

- **frontend/**: Contains all frontend-related files. Managed by the Frontend team member.
  - **assets/**: Static assets like CSS, JS, and images.
    - **css/**: Stylesheets.
    - **js/**: JavaScript files.
    - **images/**: Image assets.
  - **index.html**: Main HTML entry point.
  - **pages/**: Additional HTML pages if needed.

- **backend/**: Contains all backend-related files. Managed by the Backend (API) team member.
  - **app/**: Main application package.
    - **api/**: API-related modules.
      - **routes/**: API endpoint definitions.
      - **models/**: Database models (Python classes).
      - **schemas/**: Pydantic schemas for request/response validation.
    - **core/**: Core functionality like configuration and database connection.
    - **services/**: Business logic services.
    - **utils/**: Utility functions and helpers.
  - **main.py**: FastAPI application entry point.
  - **requirements.txt**: Python dependencies.
  - **tests/**: Unit and integration tests.

- **database/**: Database-related files. Managed by the Database & Integration team member.
  - **migrations/**: SQL migration scripts.
  - **scripts/**: Database initialization and utility scripts.
  - **models/**: SQL model definitions.

- **docs/**: Documentation files.
  - **api.md**: API documentation.

- **.env**: Environment variables (not committed to Git).
- **.gitignore**: Files to ignore in Git.
- **README.md**: Project documentation.

## Team Responsibilities

- **Frontend Team Member**: Works in `frontend/` directory. Handles HTML, CSS, JS development.
- **Backend (API) Team Member**: Works in `backend/` directory. Handles FastAPI development, API routes, models, schemas.
- **Database & Integration Team Member**: Works in `database/` and `backend/app/core/` directories. Handles database models, migrations, configuration.

This structure promotes separation of concerns, making it easy for the team to collaborate without conflicts.
