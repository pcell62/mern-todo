import React, { useEffect, useState } from "react";
import { useContext } from "react";
import Input from "../components/Input";
import Todos from "../components/Todos";
import AuthContext from "../context/AuthContext";
import TodosContext from "../context/TodosContext";
import { FaPlus, FaMinus } from "react-icons/fa"; // Import plus and minus icons

function Home() {
  const { todos, dispatch } = useContext(TodosContext);
  const { dispatch: Authdispatch, user } = useContext(AuthContext);

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch("http://localhost:3000/api/todos", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      dispatch({ type: "FETCH_TODOS", payload: json });
    };

    fetchTodos();
  }, [dispatch, user.token]);

  const handleClick = () => {
    localStorage.removeItem("user");
    Authdispatch({ type: "LOGOUT" });
    dispatch({ type: "FETCH_TODOS" });
  };

  // Separate done and undone todos
  const undoneTodos = todos.filter((todo) => !todo.done);
  const doneTodos = todos.filter((todo) => todo.done);

  // State to manage whether completed tasks are shown or hidden
  const [showCompletedTasks, setShowCompletedTasks] = useState(false);

  return (
    <div className="p-8">
      <div className="p-4 bg-slate-800 flex items-center rounded-2xl text-slate-50 justify-between mb-4">
        <h2 className="text-3xl font-bold">Taskify</h2>
        <div className="text-2xl">
          Welcome, <span>{user.userName}</span>.
        </div>
        <div>
          <button
            onClick={handleClick}
            className="ml-auto px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      <Input />
      <div>
        <h3 className="text-xl mt-4 font-bold text-red-600 bg-black p-3 rounded-full">
          Tasks to Complete:
        </h3>
        {undoneTodos.map((todo) => (
          <div key={todo._id} className="bg-red-200 p-4 rounded-lg mt-4">
            <Todos todo={todo} />
          </div>
        ))}
      </div>
      <div>
        <div className="flex items-center justify-between mt-4 bg-black p-3 rounded-full">
          <h3 className="text-xl font-bold text-green-600">Completed Tasks:</h3>
          <button onClick={() => setShowCompletedTasks(!showCompletedTasks)}>
            {showCompletedTasks ? (
              <FaMinus className="text-white text-xl" />
            ) : (
              <FaPlus className="text-white text-xl" />
            )}{" "}
            {/* Toggle plus and minus icons */}
          </button>
        </div>
        {showCompletedTasks ? (
          <div>
            {doneTodos.map((todo) => (
              <div key={todo._id} className="bg-green-200 p-4 rounded-lg mt-4">
                <Todos todo={todo} />
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Home;
