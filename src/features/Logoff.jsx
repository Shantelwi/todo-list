import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

function Logoff() {
    const { logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    async function handleLogoff() {
        const result = await logout();

        if(result.success){
            navigate('/login');
        }
    }

    if (!isAuthenticated) {
        return null;
    }

    return(
        <button onClick={handleLogoff}>Log Out</button>
    );
}

export default Logoff;