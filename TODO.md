# TODO: Integrate Frontend with Backend and Create Missing FastAPI Files

## Backend Authentication APIs
- [x] Create backend/app/api/models/user.py (User model)
- [x] Create backend/app/api/schemas/user.py (User schemas)
- [x] Create backend/app/core/security.py (password hashing, token generation utilities)
- [x] Create backend/app/api/routes/auth.py (Auth routes: signup, login, forgot password)
- [x] Update backend/main.py (include auth router, add CORS middleware)
- [x] Update backend/requirements.txt (add dependencies like passlib, python-jose)

## Frontend Integration
- [x] Ensure frontend can call backend APIs (CORS setup)
- [x] Test integration between frontend and backend

## Database Integration (Optional)
- [ ] Add persistent storage for users and items (if needed)
