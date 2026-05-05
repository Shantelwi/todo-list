import TodoListItem from './TodoListItem.jsx'

function TodoList({todoList}){
    const filteredTodoList = todoList.filter(
        (todo) => !todo.isCompleted
    );
    return (
        <ul>
        {filteredTodoList.map(todo => <TodoListItem key={todo.id} todo={todo} onCompletedTodo={onCompletedTodo}/>)}
        </ul>
    );
}

export default TodoList;