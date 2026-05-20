import { useState } from 'react';
import TodosPage from './features/Todos/TodosPage';
import Header from './shared/Header';
import Logon from './features/Logon.jsx';
import './App.css'

function App() {
  //update initial state

  return (
    <div>
      <Header />
      {!token ? (
        <Logon
          onSetEmail={setEmail}
          onSetToken={setToken} 
        />
      )  : (
        <TodosPage />
      )}
    </div>
  );
}

export default App

