import TodoListItem from './TodoListItem.jsx';
import { useMemo } from 'react';

function TodoList({
  todoList,
  dataVersion,
  onCompleteTodo,
  onUpdateTodo,
  statusFilter = 'all',
}) {
  const filteredTodos = (todoList || []).filter((todo) => {
    if (statusFilter === 'active') {
      return !todo.isCompleted;
    }

    if (statusFilter === 'completed') {
      return todo.isCompleted;
    }

    return true;
  });
  const filteredTodoList = useMemo(() => {
    let filteredTodos;

    switch (statusFilter) {
      case 'completed':
        filteredTodos = todoList.filter(
          (todo) => todo.isCompleted
        );
        break;

      case 'active':
        filteredTodos = todoList.filter(
          (todo) => !todo.isCompleted
        );
        break;

      case 'all':
      default:
        filteredTodos = todoList;
    }

    return {
      version: dataVersion,
      todos: filteredTodos,
    };
  }, [todoList, dataVersion, statusFilter]);

  return (
    <ul>
      {filteredTodoList.todos.map((todo) => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          onCompleteTodo={onCompleteTodo}
          onUpdateTodo={onUpdateTodo}
        />
      ))}
    </ul>
  );
}

export default TodoList;