import Navigation from "./Navigation";
import Logoff from '../features/Logoff';

function Header() {
    return (
        <header>
            <h1>Todo List</h1>
            
            <Navigation />

            <Logoff />
        </header>
    )
}

export default Header;