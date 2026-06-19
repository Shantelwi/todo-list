import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

function ProfilePage() {
    const { user, token } = useAuth();

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

                const data = await response.json();

                const todos = data.tasks;

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
    }, [token, user]);

    return(
        <div className="profilePage">
            <h2>Profile</h2>

            <p>{user}</p>

            {loading && <p>Loading statistics...</p>}

            {error && <p>{error}</p>}

            {!loading && !error && (
                <div className="stats">
                    <div className="stat">
                        <strong>{todoStats.total}</strong>
                        <span>Total</span>
                    </div>

                    <div className="stat">
                        <strong>{todoStats.completed}</strong>
                        <span>Completed</span>
                    </div>
                    
                    <div className="stat">
                        <strong>{todoStats.active}</strong>
                        <span>Active</span>
                    </div>

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
                </div>
            )}
        </div>
    );
}

export default ProfilePage;