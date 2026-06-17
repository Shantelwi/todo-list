# 📝 React Todo App

A modern Todo web application built with **React**, featuring authentication, protected routes, CRUD operations, optimistic UI updates, and a polished responsive interface with dark mode support.

---

## 🚀 Live Features

* 🔐 User Authentication (Login / Logout)
* 📝 Create, edit, and complete todos
* 🔎 Search, filter, and sort tasks
* 📊 Profile dashboard with task statistics
* 🌙 Dark / Light mode toggle
* 🧭 Protected routes with React Router
* ⚡ Optimistic UI updates for fast interactions
* 📱 Responsive design for mobile and desktop

---

## 🧠 Features

### 🔐 Authentication System

* Built using **React Context API**
* Stores authenticated user information and CSRF token
* Login and logout functionality
* Protected routes using a custom `RequireAuth` component

### 📝 Todo Management

Users can:

* Add new tasks
* Edit existing tasks
* Mark tasks as completed
* View task completion status instantly

The application uses **Optimistic UI Updates**, meaning the interface updates immediately while waiting for the server response, creating a smoother user experience.

### 🔎 Search, Filter & Sort

* Search tasks by keyword
* Filter completed or active tasks
* Sort tasks by:

  * Creation date
  * Completion status
* URL-based filtering using query parameters

### 📊 Profile Dashboard

Displays user statistics including:

* Total tasks
* Completed tasks
* Active tasks
* Completion percentage

Statistics are calculated dynamically from API data.

### 🌙 Dark Mode

* Dark and Light theme support
* CSS Variable-based theming
* Smooth theme transitions
* User preference persists throughout the session

---

## 🧭 Application Routes

| Route      | Description             |
| ---------- | ----------------------- |
| `/login`   | User authentication     |
| `/todos`   | Main Todo dashboard     |
| `/profile` | User statistics         |
| `/about`   | Application information |

Protected routes require authentication before access.

---

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* React Router DOM
* Context API
* useReducer Hook
* Custom CSS
* CSS Variables

### Backend Integration

* REST API
* Fetch API
* CSRF Authentication

---

## 📦 Project Structure

```bash
src/
├── components/
├── contexts/
├── features/
│   ├── Todos/
│   └── Logoff/
├── pages/
│   ├── TodosPage.jsx
│   ├── ProfilePage.jsx
│   ├── LoginPage.jsx
├── reducers/
├── shared/
├── utils/
├── App.jsx
└── main.jsx
```

---

## ⚙️ API Integration

The application communicates with a REST API.

### Endpoints

```http
GET    /api/tasks
POST   /api/tasks
PATCH  /api/tasks/:id
```

### Authentication

Requests include:

```http
X-CSRF-TOKEN: your_token_here
```

---

## 🎨 UI / UX Highlights

* Glassmorphism-inspired cards
* Modern SaaS dashboard layout
* Responsive mobile-first design
* Smooth hover and transition animations
* Flexible layouts using Flexbox and CSS Grid
* Accessible form controls and navigation

---

## 📚 What I Learned

This project strengthened my understanding of:

* React state management with Context + useReducer
* Authentication and protected routes
* REST API integration
* Async JavaScript and error handling
* Optimistic UI updates
* Component architecture and code organization
* CSS theming and dark mode implementation
* Responsive web design

---

## 🔮 Future Improvements

* Drag & drop task reordering
* Toast notifications
* Task categories and tags
* Pagination enhancements
* Persistent backend database
* Unit testing with Jest and React Testing Library
* User profile customization

---

## 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/yourusername/react-todo-app.git
cd react-todo-app
```

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```

Open:

```bash
http://localhost:5173
```

---

## 👨‍💻 Author

**Shantel Williams**

Software Developer passionate about building modern, user-friendly web applications with React and JavaScript.

Feel free to connect and explore more of my projects.
