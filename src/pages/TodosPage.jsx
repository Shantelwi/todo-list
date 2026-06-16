import { useSearchParams } from 'react-router';
import StatusFilter from '../shared/StatusFilter.jsx';
import { useEffect, useCallback, useReducer } from 'react';
import TodoList from '../features/Todos/TodoList/TodoList.jsx';
import TodoForm from '../features/Todos/TodoForm.jsx';
import SortBy from '../shared/SortBy.jsx';
import useDebounce from '../utils/useDebounce.js';
import FilterInput from '../shared/FilterInput.jsx';
import { useAuth } from '../contexts/AuthContext.jsx'
import { todoReducer, initialTodoState, TODO_ACTIONS } from "../reducers/todoReducer.js";

function TodosPage() {
    const [searchParams] = useSearchParams();
    const statusFilter = searchParams.get('status') || 'all';

    const { token } = useAuth();
    const [state, dispatch] = useReducer(todoReducer, initialTodoState);

    const {
        todoList,
        error,
        filterError,
        isTodoListLoading,
        sortBy,
        sortDirection,
        filterTerm,
        dataVersion
    } = state;

    const debouncedFilterTerm = useDebounce(filterTerm, 300);

    const invalidateCache = useCallback(() => {
        dispatch({
            type: TODO_ACTIONS.INVALIDATE_CACHE,
        });
    }, [dispatch]);

    const handlerFilterChange = (newTerm) => {
        dispatch({
            type: TODO_ACTIONS.SET_FILTER,
            payload: newTerm,
        });
    }

    async function addTodo(todoTitle) {
        const tempTodo = {
            id: Date.now(),
            title: todoTitle,
            isCompleted: false,
        };

        dispatch({
            type: TODO_ACTIONS.ADD_TODO_START,
            payload: tempTodo,
        });

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

            dispatch({
                type: TODO_ACTIONS.ADD_TODO_SUCCESS,
                payload: newTask,
                tempId: tempTodo.id,
            });

        } catch (error) {
            dispatch({
                type: TODO_ACTIONS.ADD_TODO_ERROR,
                payload: error.message,
                tempId: tempTodo.id,
            });
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

        dispatch({
            type: TODO_ACTIONS.COMPLETE_TODO,
            payload: updatedTodos,
        })

        try {
            const payload = {
                title: originalTodo.title,
                isCompleted: true,
            };

            const response = await fetch(`/api/tasks/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': token,
                },
                credentials: 'include',
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error('Failed to complete todo');
            }
        } catch (error) {
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

        dispatch({
            type: TODO_ACTIONS.UPDATE_TODO,
            payload: updatedTodos,
        });

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
        }
        invalidateCache();
    }

    useEffect(() => {
        async function fetchTodos() {
            try {
                dispatch({ type: TODO_ACTIONS.FETCH_START })
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

                dispatch({
                    type: TODO_ACTIONS.FETCH_SUCCESS,
                    payload: data.tasks,
                });
            } catch (error) {
                if (debouncedFilterTerm || sortBy !== 'creationDate' || sortDirection !== 'desc') {
                    dispatch({
                        type: TODO_ACTIONS.FETCH_ERROR,
                        payload: `Error filtering/sorting todos: ${error.message}`,
                    });
                } else {
                    dispatch({
                        type: TODO_ACTIONS.FETCH_ERROR,
                        payload: error.message,
                    });
                }
            };
        }
        if (token) {
            fetchTodos();
        }
    }, [token, sortBy, sortDirection, debouncedFilterTerm, dataVersion]);

    return (
        <div>
            {error && (
                <div>
                    <p>{error}</p>

                    <button onClick={() => dispatch({ type: TODO_ACTIONS.CLEAR_ERROR })}>
                        Clear Error
                    </button>
                </div>
            )}

            {filterError && (
                <div>
                    <p>{filterError}</p>
                    <button onClick={() => dispatch({ type: TODO_ACTIONS.CLEAR_ERROR })}>Clear Filter Error</button>
                    <button
                        onClick={() => {
                            dispatch({ type: TODO_ACTIONS.RESET_FILTERS })
                        }}
                    >Reset Filters</button>
                </div>
            )}

            {isTodoListLoading && (
                <p>Loading Todos...</p>
            )}

            <SortBy
                sortBy={sortBy}
                sortDirection={sortDirection}
                onSortByChange={(value) =>
                    dispatch({
                        type: TODO_ACTIONS.SET_SORT,
                        payload: {
                            sortBy: value,
                            sortDirection,
                        },
                    })
                }
                onSortDirectionChange={(value) =>
                    dispatch({
                        type: TODO_ACTIONS.SET_SORT,
                        payload: {
                            sortBy,
                            sortDirection: value,
                        },
                    })
                }
            />

            <StatusFilter />

            <FilterInput
                filterTerm={filterTerm}
                onFilterChange={handlerFilterChange}
            />

            <TodoForm onAddTodo={addTodo} />

            <TodoList
                todoList={todoList}
                dataVersion={dataVersion}
                onCompleteTodo={completeTodo}
                onUpdateTodo={updateTodo}
                statusFilter={statusFilter}
            />
        </div>
    );
}

export default TodosPage;