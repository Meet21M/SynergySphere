from fastapi import FastAPI
from app.api.routes.items import router as items_router

app = FastAPI(title="SynergySphere API", version="1.0.0")

app.include_router(items_router, prefix="/api/v1")

@app.get("/")
async def root():
    return {"message": "Welcome to SynergySphere API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
