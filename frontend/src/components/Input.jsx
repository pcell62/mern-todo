import React, { useContext, useRef, useState } from "react";
import AuthContext from "../context/AuthContext";
import TodosContext from "../context/TodosContext";

function Input() {
  const [todo, setTodo] = useState("");
  const input = useRef("");

  const { dispatch } = useContext(TodosContext);

  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      "https://mern-todo-mkuk.onrender.com/api/todos",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ todo }),
      }
    );

    const json = await response.json();

    if (!response.ok) {
      console.log(json.error);
    }

    if (response.ok) {
      dispatch({ type: "CREATE_TODO", payload: json });
      input.current.blur();
      setTodo("");
    }
  };

  return (
    <form
      className="flex items-center border-2 border-gray-300 rounded-lg p-2 shadow-lg"
      onSubmit={handleSubmit}
    >
      <input
        ref={input}
        type="text"
        placeholder="Enter a task..."
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        className="flex-1 px-3 py-2 border-none focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-lg"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 ml-2"
      >
        Go
      </button>
    </form>
  );
}

export default Input;
