export const TODO_ACTIONS = {
    FETCH_START: 'FETCH_START',
    FETCH_SUCCESS: 'FETCH_SUCCESS',
    FETCH_ERROR: 'FETCH_ERROR',

    ADD_TODO_START: 'ADD_TODO_START',
    ADD_TODO_SUCCESS: 'ADD_TODO_SUCCESS',
    ADD_TODO_ERROR: 'ADD_TODO_ERROR',

    COMPLETE_TODO: 'COMPLETE_TODO',
    UPDATE_TODO: 'UPDATE_TODO',

    SET_SORT: 'SET_SORT',
    SET_FILTER: 'SET_FILTER',
    CLEAR_ERROR: 'CLEAR_ERROR',
    RESET_FILTERS: 'RESET_FILTERS'
}

export const initialTodoState = {
    todoList: [],
    error: '',
    filterError: '',
    isTodoListLoading: true,
    sortBy: 'creationDate',
    sortDirection: 'asc',
    filterTerm: '',
    dataVersion: 0
}

export function todoReducer(state, action) {
    switch (action.type ) {
        case TODO_ACTIONS.FETCH_START:
            return{
                ...state,
                isTodoListLoading: true,
                error: '',
                filterError: '',
            };

        case TODO_ACTIONS.FETCH_SUCCESS:
            return{
                ...state,
                todoList: action.payload,
                isTodoListLoading: false,
                filterError: '',
            };

        case TODO_ACTIONS.FETCH_ERROR:
            return{
                ...state,
                isTodoListLoading: false,
                error: action.payload,
            };

        case TODO_ACTIONS.ADD_TODO_START:
            return{
                ...state,
                todoList: [action.payload, ...state.todoList],
                error: '',
            };

        case TODO_ACTIONS.ADD_TODO_SUCCESS:
            return{
                ...state,
                todoList: state.todoList.map((todo) =>
                    todo.id === action.tempId ? action.payload : todo 
                ),
            };

        case TODO_ACTIONS.ADD_TODO_ERROR:
            return{
                ...state,
                todoList: state.todoList.filter(
                    (todo) => todo.id !== action.tempId
                ),
                error: action.payload
            };

        case TODO_ACTIONS.COMPLETE_TODO:
            return{
                ...state,
                todoList: action.payload
            };

        case TODO_ACTIONS.UPDATE_TODO:
            return{
                ...state,
                todoList: action.payload,
            };

        case TODO_ACTIONS.SET_SORT:
            return{
                ...state,
                sortBy: action.payload.sortBy,
                sortDirection: action.payload.sortDirection,
            };

        case TODO_ACTIONS.SET_FILTER:
            return{
                ...state,
                filterTerm: action.payload
            };

        case TODO_ACTIONS.CLEAR_ERROR:
            return{
                ...state,
                error: '',
                filterError: '',
            };
            
        case TODO_ACTIONS.RESET_FILTERS:
            return{
                ...state,
                filterTerm: '',
                sortBy: 'creationDate',
                sortDirection: 'desc',
                filterError: '',
            };
        
        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
}