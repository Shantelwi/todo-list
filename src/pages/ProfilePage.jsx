import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

function ProfilePage() {
    const { user, token } = useAuth;

    const [todoStats, setTodoStats] = useState({
        total: 0,
        completed: 0,
        active: 0,
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchTodoStats() {
            if(!token) return;

            try {
                setLoading(true);

                const response = await fetch('/api/tasks', {
                    method: 'GET',
                    headers: {
                        'X-CSRF-TOKEN': token,
                    },
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch todos');
                }

                const todos = await response.json();
                const total = todos.length;
                const completed = todos.filter(
                    (todo) => todo.isCompleted
                ).length;

                const active = total - completed;

                setTodoStats({
                    total,
                    completed,
                    active,
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchTodoStats();
    }, [token]);

    return(
        <div>
            <h2>Profile</h2>

            <p>Name: {user?.name}</p>

            {loading && <p>Loading statistics...</p>}

            {error && <p>{error}</p>}

            {!loading && !error && (
                <>
                    <p>Total Todos: {todoStats.total}</p>
                    <p>Completed: {todoStats.completed}</p>
                    <p>Active: {todoStats.active}</p>

                    {todoStats.total > 0 && (
                        <p>
                            Completion Rate: {' '}
                            {Math.round(
                                (todoStats.completed /
                                    todoStats.total) *
                                    100
                            )}
                            %
                        </p>
                    )}
                </>
            )}
        </div>
    );
}

export default ProfilePage;