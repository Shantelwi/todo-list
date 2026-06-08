import { useState } from 'react';
import { Routes, Route } from "react-router";
import { Header } from "./shared/Header";
import './App.css'

function App() {

  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  
  return (
    <>
      <Header />
      <Routes>
        {}
      </Routes>
    </>
  );
}

export default App

