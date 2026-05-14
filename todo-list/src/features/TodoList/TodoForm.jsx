import { useRef, useState } from 'react';
import TextInputWithLabel from '../../shared/TextInputWithLabel.jsx';
import {isValidTodoTitle} from '../../utils/todoValidation';

 //create form submit handler
function TodoForm({ onAddTodo }) {
    const inputRef = useRef();

    const [workingTodoTitle, setWorkingTodoTitle] = useState('');

    const handleAddTodo = (event) => {
        event.preventDefault();

        if (workingTodoTitle.trim()){
            onAddTodo(workingTodoTitle);
            setWorkingTodoTitle('');
            inputRef.current.focus();
        }

        // const todoTitle = event.target.todoTitle.value.trim();
        // if (todoTitle && todoTitle !== "") {
        //     onAddTodo(todoTitle);
        //     setWorkingTodoTitle('');
        //     event.target.reset();
        //     inputRef.current.focus();
        // }
    };
    return (
        <form onSubmit={handleAddTodo}>
            <TextInputWithLabel
                ref = {inputRef}
                elementId = "todoTitle"
                labelText = "Todo"
                value = {workingTodoTitle}
                onChange = {(e) => setWorkingTodoTitle(e.target.value)}
            />
            <button disabled={!isValidTodoTitle(workingTodoTitle)}> Add Todo </button>
        </form>
    );
}

export default TodoForm;