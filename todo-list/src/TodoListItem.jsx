
//Destructured
function TodoListItem({todo}){
    return (
        <div>
            {todo.id} {todo.title}
        </div>
    );
}

export default TodoListItem;