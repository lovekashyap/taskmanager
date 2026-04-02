# Task Manager App

A full-stack task management application built with the MERN stack. Users can register, log in, and manage their personal tasks with full CRUD functionality.

## Live Demo
- Frontend: [your-app.vercel.app](https://your-app.vercel.app)
- Backend: [your-api.onrender.com](https://your-api.onrender.com)

---

## Screenshots

![Dashboard](screenshots/dashboard.png)
![Login](screenshots/login.png)

---

## Features

- User registration and login with JWT authentication
- Password hashing with bcrypt
- Create, read, update and delete tasks
- Filter tasks by status — All, Pending, Completed
- Protected routes — only logged-in users can access their tasks
- Each user only sees their own tasks
- Responsive design

---

## Tech Stack

**Frontend**
- React.js
- React Router DOM
- Axios

**Backend**
- Node.js
- Express.js
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- bcryptjs

---

## Getting Started

### Prerequisites
- Node.js installed
- MongoDB Atlas account (free)

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/task-manager-app.git
cd task-manager-app
```

### 2. Setup backend
```bash
cd task-manager-backend
npm install
```

Create a `.env` file inside `task-manager-backend`:
```
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
```
```bash
npm run dev
```

### 3. Setup frontend
```bash
cd task-manager-frontend
npm install
npm start
```

App runs at `http://localhost:3000`

---

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and get token |

### Tasks (protected — requires JWT)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks for logged-in user |
| POST | `/api/tasks` | Create a new task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

---

## Project Structure
```
task-manager-app/
├── task-manager-backend/
│   ├── config/
│   │   └── db.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── Task.js
│   │   └── User.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── tasks.js
│   └── server.js
│
└── task-manager-frontend/
    └── src/
        ├── components/
        │   ├── Navbar.js
        │   └── TaskCard.js
        ├── pages/
        │   ├── Login.js
        │   ├── Register.js
        │   └── Dashboard.js
        ├── api.js
        └── App.js
```

---

## What I Learned

- Building a REST API with Node.js and Express
- Connecting to MongoDB using Mongoose
- Implementing JWT-based authentication from scratch
- Managing React state with useState and useEffect
- Connecting a React frontend to a Node.js backend using Axios
- Deploying a full-stack app using Render and Vercel

---

## Author

**Kumar Love**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [linkedin.com/in/yourprofile](https://linkedin.com/in/yourprofile)

---

## License
MIT
