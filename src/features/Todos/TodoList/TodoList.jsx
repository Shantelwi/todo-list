import TodoListItem from "./TodoListItem.jsx";
import { useMemo } from "react";

function TodoList({
  todoList = [],
  dataVersion,
  onCompleteTodo,
  onUpdateTodo,
  statusFilter = "all",
}) {
  const filteredTodoList = useMemo(() => {
    let filteredTodos;

    switch (statusFilter) {
      case "completed":
        filteredTodos = todoList.filter((todo) => todo.isCompleted);
        break;

      case "active":
        filteredTodos = todoList.filter((todo) => !todo.isCompleted);
        break;

      case "all":
      default:
        return true;
    }

    return {
      version: dataVersion,
      todos: filteredTodos,
    };
  }, [todoList, dataVersion, statusFilter]);

  if (filteredTodoList.todos.length === 0) {
    return <p>No todos yet. Add your first task!</p>;
  }

  return (
    <>
      {filteredTodoList.todos.map((todo) => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          onCompleteTodo={onCompleteTodo}
          onUpdateTodo={onUpdateTodo}
        />
      ))}
    </>
  );
}

export default TodoList;
