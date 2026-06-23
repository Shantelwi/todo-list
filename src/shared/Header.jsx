import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router";

function Header() {
  const { isAuthenticated, logoff } = useAuth();
  const navigate = useNavigate();

  function handleLogoff() {
    logoff();
    navigate("/login");
  }

  return (
    <header>
      <h1>Todo List</h1>

      {isAuthenticated && <button onClick={handleLogoff}>Logoff</button>}
    </header>
  );
}

export default Header;
