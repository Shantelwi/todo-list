//Destructured	
import { useState } from 'react';
import TextInputWithLabel from '../../shared/TextInputWithLabel.jsx';
import { isValidTodoTitle } from '../../utils/todoValidation';

function TodoListItem({ todo, onCompleteTodo, onUpdateTodo }) {
	const [isEditing, setIsEditing] = useState(false);

	const [workingTitle, setWorkingTitle] = useState(todo.title);

	const handleEdit = (e) => {
		setWorkingTitle(e.target.value);
	};

	const handleCancel = () => {
		setWorkingTitle(todo.title);
		setIsEditing(false);
	};

	const handleUpdate = (e) => {
		if (!isEditing) return;
		e.preventDefault();

		onUpdateTodo({
			...todo,
			title: workingTitle
		});

		setIsEditing(false);
	}

	return (
		<li>
			<form onSubmit={handleUpdate}>
				{isEditing ? (
					<>
						<TextInputWithLabel
							value={workingTitle}
							onChange={handleEdit}
						/>

						<button type="button"onClick={handleCancel}>Cancel</button>

						<button type="submit"disabled={!isValidTodoTitle(workingTitle)}>Update</button>
					</>
				) : (
					<label>
						<input
							type="checkbox"
							id={`checkbox${todo.id}`}
							checked={todo.isCompleted}
							onChange={() => onCompleteTodo(todo.id)}
						/>

						<span onClick={() => setIsEditing(true)}>
							{todo.title}
						</span>
					</label>
				)}
			</form>
		</li>
	);
}

export default TodoListItem;