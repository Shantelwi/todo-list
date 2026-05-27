import TodoListItem from './TodoListItem.jsx';
import { useMemo } from 'react';

function TodoList({
  todoList,
  onCompleteTodo,
  onUpdateTodo,
}) {
  const filteredTodoList = useMemo(() => {
    return {
      version: dataVersion,
      todos: todoList.filter((todo) => !todo.isCompleted)
    };
  }, [todoList, dataVersion]);

  return (
    <ul>
      {filteredTodoList.map((todo) => (
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