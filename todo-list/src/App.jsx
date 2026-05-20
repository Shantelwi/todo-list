import { useState } from 'react';
import TodosPage from './features/Todos/TodosPage';
import Header from './shared/Header';
import './App.css'

function App() {
  //update initial state

  return (
    <div>
      <Header />
      <TodosPage />
    </div>
  )
}

export default App

