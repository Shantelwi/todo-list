import { useEffect, useState } from 'react';
import TodoList from '../TodoList/TodoList.jsx';
import TodoForm from '../Todos/TodoForm.jsx';


function TodosPage({ token }) {
    const [todoList, setTodoList] = useState([]);

    const [error, setError] = useState([]);
    const [isTodoListLoading, setIsTodoListLoading] = useState(false);

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

    useEffect(() => {
        async function fetchTodos() {
            try {
                setIsTodoListLoading(true);
                setError('');

                const response = await fetch('/api/tasks', {
                    method: 'GET',
                    headers: {
                        'X-CSRF-TOKEN': token,
                    },
                    credentials: 'include'
                });
                if (response.status === 401) {
                    throw new Error('unauthorized');
                }
                if (!response.ok) {
                    throw new Error('Failed to fetch todos');
                }
                const data = await response.json();

                setTodoList(data.tasks);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsTodoListLoading(false);
            }
        }
        if (token) {
            fetchTodos();
        }
    }, [token]);

    return (
        <div>
            {error && <p>{error}</p>}
            {isTodoListLoading ? (
                <p>Loading Todos...</p>
            ) : (

                <>
                    <TodoForm onAddTodo={addTodo} />
                    <TodoList
                        todoList={todoList}
                        onCompleteTodo={completeTodo}
                        onUpdateTodo={updateTodo}
                    />
                </>
            )}
        </div>
    )
}

export default TodosPage;