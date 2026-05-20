import TodoList from './features/TodoList/TodoList.jsx';
import TodoForm from './features/TodoForm.jsx';


function TodosPage() {
    const [todoList, setTodoList] = useState([]);

    //create the add todo handler
    function addTodo(todoTitle) {
        const todo = { id: Date.now(), title: todoTitle, isCompleted: false };
        setTodoList(todoList => [todo, ...todoList]);
    }

    function completeTodo(id) {
        const updateTodo = todoList.map((todo) => {
            if (todo.id === id) {
                return { ...todo, isCompleted: true };
            } else {
                return todo;
            }
        });

        setTodoList(updateTodo);
    }

    function updateTodo(editedTodo) {
        const updateTodos = todoList.map((todo) => {
            if (todo.id === editedTodo.id) {
                return { ...editedTodo };
            } else {
                return todo;
            }
        });
        setTodoList(updateTodos);
    }

    return (
        <>
            <TodoForm onAddTodo={addTodo} />
            <TodoList
                todoList={todoList}
                onCompleteTodo={completeTodo}
                onUpdateTodo={updateTodo}
            />
        </>
    )
}

export default TodosPage;