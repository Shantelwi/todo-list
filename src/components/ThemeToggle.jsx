import { useState, useEffect } from "react";

function ThemeToggle() {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    }, [darkMode]);

    return (
        <button
            className="theme-toggle"
            onClick={() => setDarkMode(prev => !prev)}
        >
            {darkMode ? "Light Mode ☀️" : "Dark Mode 🌙"}
        </button>
    );
}

export default ThemeToggle;