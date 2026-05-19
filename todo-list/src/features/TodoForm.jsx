import { useRef, useState } from 'react';
import TextInputWithLabel from '../shared/TextInputWithLabel.jsx';
import { isValidTodoTitle } from '../utils/todoValidation.js';

 //create form submit handler
function TodoForm({ onAddTodo }) {
    const inputRef = useRef();
    const [workingTodoTitle, setWorkingTodoTitle] = useState('');

    function handleAddTodo (event) {
        event.preventDefault();

        if (isValidTodoTitle(workingTodoTitle)) {
            onAddTodo(workingTodoTitle);
            setWorkingTodoTitle('');
            inputRef.current.focus();
        }
    

    };
    return (
        <form onSubmit={handleAddTodo}>
            <TextInputWithLabel
                elementId = "todoTitle"
                labelText = "Todo"
                ref = {inputRef}
                value = {workingTodoTitle}
                onChange = {(e) => setWorkingTodoTitle(e.target.value)}
            />

            <button
                type = "submit"
                disabled = {!isValidTodoTitle(workingTodoTitle)}
            >Add Todo</button>
        </form>
    );
}

export default TodoForm;