import { useRef, useState } from 'react';
import TextInputWithLabel from '../../shared/TextInputWithLabel.jsx';
import { isValidTodoTitle } from '../../utils/todoValidation.js';
import DOMPurify from 'dompurify';

const sanitizeInput = (input) => {
  return DOMPurify.sanitize(input.trim(), {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  });
};

function TodoForm({ onAddTodo }) {
  const inputRef = useRef();

  const [workingTodoTitle, setWorkingTodoTitle] = useState('');

  function handleAddTodo(event) {
    event.preventDefault();

    if (!isValidTodoTitle(workingTodoTitle)) {
      return;
    }

    const cleanTitle = sanitizeInput(workingTodoTitle);

    if (cleanTitle.length > 100) {
      return;
    }

    onAddTodo(cleanTitle);

    setWorkingTodoTitle('');

    if (inputRef.current) {
      inputRef.current.focus();
    }
  }

  return (
    <form onSubmit={handleAddTodo}>
      <TextInputWithLabel
        elementId="todoTitle"
        labelText="Todo"
        inputRef={inputRef}
        value={workingTodoTitle}
        onChange={(e) => setWorkingTodoTitle(e.target.value)}
        maxLength={100}
      />

      <button
        type="submit"
        disabled={!isValidTodoTitle(workingTodoTitle)}
      >
        Add Todo
      </button>
    </form>
  );
}

export default TodoForm;