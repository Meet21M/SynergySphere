from src.routers.user import user_router
from src.routers.project import project_router


app = FastAPI()

app.include_router(user_router)
app.include_router(project_router)
