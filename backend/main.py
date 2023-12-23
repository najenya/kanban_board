from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from fastapi import status


Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    password = Column(String)

class Task(Base):
    __tablename__ = "tasks"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    status = Column(String)



DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)

app = FastAPI()


origins = ["http://localhost:3000"]  
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TaskCreate(BaseModel):
    title: str

class UserLogin(BaseModel):
    username: str
    password: str
    

class UserCreate(BaseModel):
    username: str
    password: str




@app.get("/board/tasks/")
def read_tasks():
    db = SessionLocal()
    tasks = db.query(Task).all()
    db.close()
    return tasks


@app.get("/board/tasks/{task_id}")
def read_task(task_id: int):
    db = SessionLocal()
    db_task = db.query(Task).filter(Task.id == task_id).first()
    db.close()
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return db_task


@app.post("/board/tasks/")
def create_task(task: TaskCreate):
    db = SessionLocal()
    db_task = Task(title=task.title, status="ToDo")
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    db.close()
    return db_task


@app.put("/board/tasks/{task_id}/{new_status}")
def update_task_status(task_id: int, new_status: str):
    db = SessionLocal()
    db_task = db.query(Task).filter(Task.id == task_id).first()
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    db_task.status = new_status
    db.commit()
    db.refresh(db_task)
    db.close()
    return db_task


@app.delete("/board/tasks/{task_id}")
def delete_task(task_id: int):
    db = SessionLocal()
    db_task = db.query(Task).filter(Task.id == task_id).first()
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    db.delete(db_task)
    db.commit()
    db.close()
    return {"message": "Task deleted successfully"}





@app.post("/board/login")
def login_user(user: UserLogin):
    db = SessionLocal()
    db_user = db.query(User).filter(User.username == user.username).first()
    if db_user and db_user.password == user.password:
        db.close()
        return {"message": "Login successful"}
    else:
        db.close()
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
        )




@app.post("/board/register")
def register_user(user: UserCreate):
    db = SessionLocal()
    existing_user = db.query(User).filter(User.username == user.username).first()
    if existing_user:
        db.close()
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Username already registered",
        )
    
    new_user = User(username=user.username, password=user.password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    db.close()



@app.get("/board/users/")
def get_all_users():
    db = SessionLocal()
    users = db.query(User).all()
    return users


@app.get("/board/users/{user_id}")
def get_user_by_id(user_id: int):
    db = SessionLocal()
    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user
