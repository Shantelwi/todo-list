import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  async function login(email, password) {
    try {
      const response = await fetch('/api/users/logon', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.message };
      }

      setUser(data.name);
      setToken(data.csrfToken);
      setIsAuthenticated(true);

      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }

  function logout() {
    setIsAuthenticated(false);
    setUser(null);
    setToken(null);
    return { success: true };
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}