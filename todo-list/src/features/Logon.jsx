import { useState } from 'react';

function Logon({
    onSetEmail,
    onSetToken 
}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authError, setAuthError] = useState('');
    const [isLoggingOn, setIsLoggingOn] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        setIsLoggingOn(true);
        setAuthError('');

        try {
            const response = await fetch('/api/users/logon', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (response.status === 200 && data.name && data.csrfToken) {
                onSetEmail(data.name);
                onSetToken(data.csrfToken);
            } else {
                setAuthError(`Authentification failed: ${data?.message}`);
            }
        } catch (error) {
            setAuthError(`Error: ${error.name} | ${error.message}`);
        } finally {
            setIsLoggingOn(false);
        }
    }

    return(
        <section>
            <h2>Log On</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="text"
                        id='email'
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                       required
                    />
                </div>

                <div>
                    <label htmlFor="password"> Password </label>
                        <input 
                            type="text"
                            id='password'
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            required 
                        />
                </div>
                {authError && <p>{authError}</p>}

                <button type='submit'
                disabled={isLoggingOn}
                >
                    {isLoggingOn ? 'Logging On...' : 'Log On'}
                </button>
            </form>
        </section>
    )
}
export default Logon;