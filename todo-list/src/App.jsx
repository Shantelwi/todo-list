import { useState } from 'react';
import TodoList from './TodoList.jsx';
import TodoForm from './TodoForm.jsx';
import './App.css'

function App() {
  //update initial state
  const [todoList, setTodoList] = useState([]);
  
  //create the add todo handler
  function addTodo(todoTitle){
    const todo = {id: Date.now(), title: todoTitle, isCompleted: false}
    setTodoList(todoList => [todo, ...todoList])
  }

  function completeTodo(id){
    const updateTodos = todoList.map((todo) => {
      if (todo.id === id) {
        return {...todo, isCompleted: true};
      }else {
        return todo;
      }
    });

    setTodoList(updateTodos);
  }

  return (
    <div>
      <h1>My Todos</h1>

      {/* pass the handler to TodoForm */}
      <TodoForm onAddTodo={addTodo} />
      <TodoList 
      todoList={todoList}
      onCompleteTodo = {completeTodo} />
    </div>
  )
}

export default App

