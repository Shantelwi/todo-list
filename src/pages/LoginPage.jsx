import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/todos';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingOn, setIsLoggingOn] = useState(false);
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  async function handleSubmit(e) {
    e.preventDefault();

    setIsLoggingOn(true);
    setAuthError('');

    const result = await login(email, password);

    if (!result.success) {
      setAuthError(result.error);
    }

    setIsLoggingOn(false);
  }

  return (
    <section>
      <h2>Login</h2>

      <form onSubmit={handleSubmit} className='login'>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
          required
        />

        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
          required
        />

        {authError && <p>{authError}</p>}

        <button disabled={isLoggingOn}>
          {isLoggingOn ? 'Logging in...' : 'Log In'}
        </button>
      </form>
    </section>
  );
}

export default LoginPage;