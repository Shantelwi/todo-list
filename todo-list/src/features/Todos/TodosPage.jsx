import { useEffect, useState, useCallback } from 'react';
import TodoList from '../Todos/TodoList/TodoList.jsx';
import TodoForm from './TodoForm.jsx';
import SortBy from '../../shared/SortBy.jsx';
import useDebounce from '../../utils/useDebounce.js';
import FilterInput from '../../shared/FilterInput.jsx';

function TodosPage({ token }) {
    const [todoList, setTodoList] = useState([]);

    const [sortBy, setSortBy] = useState('creationDate');
    const [sortDirection, setSortDirection] = useState('desc');

    const [error, setError] = useState('');
    const [isTodoListLoading, setIsTodoListLoading] = useState(false);

    const [filterTerm, setFilterTerm] = useState('');
    const debouncedFilterTerm = useDebounce(filterTerm, 300);

    const [dataVersion, setDataVersion] = useState(0);

    const invalidateCache = useCallback(() => {
        setDataVersion((prev) => prev + 1);
    }, []);

    const handlerFilterChange = (newTerm)  => {
        setFilterTerm(newTerm);
    }

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
        invalidateCache();
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
                    createdAt: originalTodo.createdAt
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
        invalidateCache();
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
                        createdAt: originalTodo.createdAt
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
        invalidateCache();
    }

    useEffect(() => {
        async function fetchTodos() {
            try {
                setIsTodoListLoading(true);
                setError('');
                const paramsObject = {
                    sortBy,
                    sortDirection
                };
                if (debouncedFilterTerm) {
                    paramsObject.find = debouncedFilterTerm;
                }

                const params = new URLSearchParams(paramsObject);

                const response = await fetch(`/api/tasks?${params}`, {
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
    }, [token, sortBy, sortDirection, debouncedFilterTerm]);

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

            <SortBy
                sortBy={sortBy}
                sortDirection={sortDirection}
                onSortByChange={setSortBy}
                onSortDirectionChange={setSortDirection}
            />

            <FilterInput
                filterTerm = {filterTerm}
                onFilterChange = {handlerFilterChange}
            />

            <TodoForm onAddTodo={addTodo} />

            <TodoList
                todoList={todoList}
                dataVersion={dataVersion}
                onCompleteTodo={completeTodo}
                onUpdateTodo={updateTodo}
            />
        </div>
    );
}

export default TodosPage;