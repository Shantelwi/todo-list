import { useEffect, useState } from 'react';
import TodoList from '../TodoList/TodoList.jsx';
import TodoForm from './TodoForm.jsx';


function TodosPage({ token }) {
    const [todoList, setTodoList] = useState([]);

    const [error, setError] = useState('');
    const [isTodoListLoading, setIsTodoListLoading] = useState(false);

    async function addTodo(todoTitle) {
        const tempTodo = {
            id: Date.now(),
            title: todoTitle,
            isCompleted: false,
        };

        setTodoList((prevTodos) => [tempTodo, ...prevTodos]);

        try {
            const response = await fetch('/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': token,
                },
                credentials: 'include',
                body: JSON.stringify({
                    title: todoTitle,
                    isCompleted: false,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to add todo');
            }

            const data = await response.json();

            const newTask = data.task || data;

            setTodoList(prev =>
                prev.map(todo =>
                    todo.id === tempTodo.id ? newTask : todo
                )
            );
        } catch (error) {
            setTodoList((prevTodos) =>
                prevTodos.filter((todo) => todo.id !== tempTodo.id)
            );

            setError(error.message);
        }
    }

    async function completeTodo(id) {
        const originalTodo = todoList.find(
            (todo) => todo.id === id
        );

        const updatedTodos = todoList.map((todo) => {
            if (todo.id === id) {
                return {
                    ...todo,
                    isCompleted: true,
                };
            }

            return todo;
        });

        setTodoList(updatedTodos);

        try {
            const response = await fetch(`/api/tasks/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': token,
                },
                credentials: 'include',
                body: JSON.stringify({
                    isCompleted: true,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to complete todo');
            }
        } catch (error) {
            setTodoList((prevTodos) =>
                prevTodos.map((todo) =>
                    todo.id === id ? originalTodo : todo
                )
            );

            setError(error.message);
        }
    }

    async function updateTodo(editedTodo) {
        const originalTodo = todoList.find(
            (todo) => todo.id === editedTodo.id
        );

        const updatedTodos = todoList.map((todo) => {
            if (todo.id === editedTodo.id) {
                return editedTodo;
            }

            return todo;
        });

        setTodoList(updatedTodos);

        try {
            const response = await fetch(
                `/api/tasks/${editedTodo.id}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': token,
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        title: editedTodo.title,
                        isCompleted: editedTodo.isCompleted,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error('Failed to update todo');
            }
        } catch (error) {
            setTodoList((prevTodos) =>
                prevTodos.map((todo) =>
                    todo.id === originalTodo.id
                        ? originalTodo
                        : todo
                )
            );

            setError(error.message);
        }
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
            {error && (
                <div>
                    <p>{error}</p>

                    <button onClick={() => setError('')}>
                        Clear Error
                    </button>
                </div>
            )}

            {isTodoListLoading && (
                <p>Loading Todos...</p>
            )}

            <TodoForm onAddTodo={addTodo} />

            <TodoList
                todoList={todoList}
                onCompleteTodo={completeTodo}
                onUpdateTodo={updateTodo}
            />
        </div>
    );
}

export default TodosPage;