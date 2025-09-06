from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes.items import router as items_router
from app.api.routes.auth import router as auth_router

app = FastAPI(title="SynergySphere API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(items_router, prefix="/api/v1")
app.include_router(auth_router, prefix="/api/v1/auth", tags=["auth"])

@app.get("/")
async def root():
    return {"message": "Welcome to SynergySphere API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
