import { useReducer, createContext } from "react";

const TodosContext = createContext();

const todoReducer = (state, action) => {
  switch (action.type) {
    case "CREATE_TODO":
      return {
        todos: [action.payload, ...state.todos],
      };
    case "FETCH_TODOS":
      return {
        todos: action.payload,
      };
    case "DELETE_TODO":
      return {
        todos: state.todos.filter((t) => t._id !== action.payload._id),
      };
    case "UPDATE_TODO":
      const updatedTodos = state.todos.map((t) => {
        if (t._id === action.payload._id) {
          return { ...t, todo: action.newTodo };
        }
        return t;
      });
      return {
        todos: updatedTodos,
      };
    case "MARK_TODO_AS_DONE":
      const markedTodos = state.todos.map((t) => {
        if (t._id === action.payload._id) {
          return { ...t, done: true };
        }
        return t;
      });
      return {
        todos: markedTodos,
      };
    default:
      return state;
  }
};

export const TodosContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, {
    todos: [],
  });

  return (
    <TodosContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TodosContext.Provider>
  );
};

export default TodosContext;
