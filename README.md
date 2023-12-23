# Task Manager

The Task Manager project is a simple web application for task management. It includes a backend developed with FastAPI and SQLAlchemy, as well as a React frontend.

## Installation and Setup

### Backend (FastAPI)

1. **Navigate to the backend directory:**

    ```bash
    cd task-manager/backend
    ```

2. **Run the FastAPI server:**

    ```bash
    uvicorn main:app --reload
    ```

    The server will be available at `http://127.0.0.1:8000`.

### Frontend (React)

1. **Navigate to the frontend directory:**

    ```bash
    cd task-manager/frontend
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Run the React application:**

    ```bash
    npm start
    ```

    The application will be available at `http://localhost:3000`.

## Project Structure

- **backend/:** Directory containing the FastAPI application and database.
  - `main.py`: Main application file.
- **frontend/:** Directory containing the React application.
  - `src/:` Source code for the React application.
    - `App.js`: Main application component.
    - `styles.css`: Style file.
    
    - `components/:` React components.
    - `TaskList.js`: Component for displaying the task list.
    - `AddTask.js`: Component for adding a task.
    - `TaskItem.js`: Component for displaying an individual task.
    - `Login.js`: Component for login users.
    - `Register.js`: Component for registration users.

## API Usage

- API description and available endpoints can be found in the Swagger interface: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
