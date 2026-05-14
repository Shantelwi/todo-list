import { useRef } from 'react';
import TextInputWithLabel from '../../shared/TextInputWithLabel.jsx';

 //create form submit handler
function TodoForm({ onAddTodo }) {
    const inputRef = useRef();

    const handleAddTodo = (event) => {
        event.preventDefault();

        const todoTitle = event.target.todoTitle.value.trim();
        if (todoTitle && todoTitle !== "") {
            onAddTodo(todoTitle);
            event.target.reset();
            inputRef.current.focus();
        }
    };
    return (
        <form onSubmit={handleAddTodo}>
            <TextInputWithLabel
                ref = {inputRef}
                elementId = "todoTitle"
                labelText = "Todo"
            />
            <button type="submit"> Add Todo </button>
        </form>
    );
}

export default TodoForm;