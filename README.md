📝 React Todo App

A modern full-stack-inspired Todo web application built with React, featuring authentication, routing, CRUD operations, state management with reducers, and a polished UI with dark mode support.

🚀 Live Features
🔐 User authentication (login/logout)
📝 Create, update, and complete todos
🔎 Search, filter, and sort tasks
📊 Profile dashboard with task statistics
🌙 Dark / Light mode toggle
🧭 Protected routes with React Router
⚡ Optimistic UI updates for fast interactions
📱 Responsive design for mobile and desktop
🧠 Key Features Breakdown
🔐 Authentication System
Built using React Context API
Stores user session and token
Protects private routes using a RequireAuth component
📝 Todo Management
Add new tasks instantly
Mark tasks as completed
Edit and update existing tasks
Optimistic updates for smooth UX (UI updates before API confirms changes)
🔎 Filtering & Sorting
Filter tasks by search term
Sort by creation date or other criteria
URL-based filtering support using query parameters
📊 Profile Dashboard
Displays user task analytics:
Total tasks
Completed tasks
Active tasks
Completion rate percentage
Fetches live data from API and processes it in the frontend
🌙 Theme System
Dark mode / Light mode toggle
CSS variable-based theming system
Smooth visual transitions between themes
🧭 Routing Structure
/login – Authentication page
/todos – Main task manager
/profile – User statistics dashboard
/about – App information page
Protected routes for authenticated users only
🛠️ Tech Stack
React (Vite)
React Router
Context API
useReducer Hook
CSS (custom variables + dark mode)
REST API integration
Fetch API
📦 Project Structure
src/
├── components/
├── contexts/
├── features/
│   ├── Todos/
│   ├── Logoff/
├── pages/
│   ├── TodosPage.jsx
│   ├── ProfilePage.jsx
│   ├── LoginPage.jsx
├── reducers/
├── shared/
├── utils/
├── App.jsx
⚙️ API Integration

This app connects to a REST API:

/api/tasks

Supports:

GET → Fetch tasks
POST → Create task
PATCH → Update task

Includes authentication via:

X-CSRF-TOKEN header
🎨 UI/UX Highlights
Glassmorphism-inspired cards
Smooth hover animations
Clean spacing system using Flexbox & Grid
Responsive mobile-first design
Modern SaaS-style dashboard layout
📊 What I Learned

This project helped strengthen my understanding of:

React state management patterns (useReducer + Context)
API integration and async logic handling
Protected routes and authentication flow
Optimistic UI updates
Component architecture and reusable design patterns
CSS theming and dark mode implementation
🔮 Future Improvements
Drag & drop task reordering
Toast notifications for actions
Pagination improvements
Task categories/tags
Backend integration with full database persistence
Unit testing (Jest / React Testing Library)
📸 Preview

👨‍💻 Author

Built by Shantel Williams
