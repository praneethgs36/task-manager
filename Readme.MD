# Task Manager – Full Stack Application

A full-stack task management application built as part of my software developer intern assignment at Aifer. The app supports user authentication, protected routes, and complete CRUD operations on tasks.

---

## Features

### Authentication
- User registration and login
![Registration](screenshots/registration.png)
![Login](screenshots/login.png)
- JWT-based authentication
- Protected frontend routes
- Secure backend route protection

### Task Management
- Create new tasks
![Add task](screenshots/create-tasks.png)
- View all tasks (user-specific)
![List of tasks](screenshots/list-tasks.png)
- Mark tasks as completed
![Completed tasks](screenshots/completed-task.png)
- Delete tasks
![Deleted tasks](screenshots/deleted-task.png)
- Optimistic UI updates

### UX Enhancements
- Loading states for async actions
- Error handling with user-friendly messages
- Logout functionality
- Responsive layout with Tailwind CSS

---

## Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS (v4)
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- JWT (JSON Web Tokens)

---

## Project Structure

task-manager/
├── backend/
│ ├── routes/
│ ├── models/
│ ├── middleware/
│ └── server.js
│
├── frontend/
│ ├── src/
│ │ ├── pages/
│ │ ├── components/
│ │ ├── api/
│ │ └── main.jsx
│ └── index.html
│
├── screenshots/
└── README.md


---

## Authentication Flow

1. User registers via `/auth/register`
2. User logs in via `/auth/login`
3. Backend issues a JWT
4. JWT is stored in `localStorage`
5. Axios interceptor attaches JWT to all requests
6. Protected routes validate JWT on both frontend and backend

---

## API Endpoints

### Auth
- `POST /auth/register` – Register a new user
- `POST /auth/login` – Login and receive JWT

### Tasks (Protected)
- `GET /tasks` – Fetch user tasks
- `POST /tasks` – Create task
- `PATCH /tasks/:id` – Mark task as completed
- `DELETE /tasks/:id` – Delete task

---

## API Testing

All backend APIs were tested independently using Postman before frontend integration.

### Starting Backend Server
![Starting Server](screenshots/backend-running.png)
![Backend up](screenshots/backend-running-1.png)

## API Testing (Postman)

All backend APIs are tested independently using Postman before frontend integration.

### 1. Server Health Check
![Server Test](screenshots/01-server-test.png)

### 2. User Registration
![Register User](screenshots/02-register-user.png)

### 3. User Login (JWT Token)
![Login JWT](screenshots/03-login-jwt.png)

### 4. Create Task (Authenticated)
![Create Task](screenshots/04-create-task.png)

### 5. Get Tasks
![Get Tasks](screenshots/05-get-tasks.png)

### 6. Update Task
![Update Task](screenshots/06-update-task.png)

### 7. Delete Task
![Delete Task](screenshots/07-delete-task.png)

---

## Axios

I used Axios with a centralized API instance and request interceptor to attach JWT tokens automatically.

### Starting Frontend Server
![Starting Server](screenshots/frontend-running.png)
![Frontend up](screenshots/frontend-running-1.png)