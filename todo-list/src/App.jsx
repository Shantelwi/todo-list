import { useState } from 'react';
import TodoList from './features/TodoList/TodoList.jsx';
import TodoForm from './features/TodoList/TodoForm.jsx';
import './App.css'

function App() {
  //update initial state
  const [todoList, setTodoList] = useState([]);
  
  //create the add todo handler
  function addTodo(todoTitle){
    const todo = {id: Date.now(), title: todoTitle}
    setTodoList(todoList => [todo, ...todoList])
  }

  function updateTodo(editedTodo) {
    setTodoList((prevTodos) => 
      prevTodos.map((todo) => 
        todo.id === editedTodo.id
        ? { ...editedTodo}
        : todo
      )
    );
  }

  return (
    <div>
      <h1>My Todos</h1>

      {/* pass the handler to TodoForm */}
      <TodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} onUpdateTodo = {updateTodo} />
    </div>
  )
}

export default App

