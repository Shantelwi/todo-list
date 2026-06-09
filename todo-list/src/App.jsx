import { useState } from 'react';
import { Routes, Route } from "react-router";
import HomePage from './pages/HomePage';
import AboutPage  from "./pages/AboutPage";
import LoginPage  from "./pages/LoginPage";
import TodosPage  from "./pages/TodosPage";
import ProfilePage  from './pages/ProfilePage';
import NotFoundPage  from './pages/NotFoundPage';
import RequireAuth  from './components/RequireAuth';
import Header from "./shared/Header";
import './App.css'

function App() {

  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  
  return (
    <>
      <Header />
      <Routes>
        <Route />
        <Route />
        <Route />
        <Route />
        <Route />
        <Route />
      </Routes>
    </>
  );
}

export default App

