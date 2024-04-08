import React, { useContext, useRef, useState } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdOutlineDownloadDone } from "react-icons/md";
import AuthContext from "../context/AuthContext";
import TodosContext from "../context/TodosContext";

function Todos({ todo: t }) {
  const [edit, setEdit] = useState(false);
  const [todo, setTodo] = useState("");

  const input = useRef("");
  const p = useRef("");

  const { dispatch } = useContext(TodosContext);

  const { user } = useContext(AuthContext);

  const deleteTodo = async () => {
    const response = await fetch("http://localhost:3000/api/todos/" + t._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      console.log(json.error);
    }

    if (response.ok) {
      dispatch({ type: "DELETE_TODO", payload: json });
    }
  };

  const editTodo = async () => {
    const response = await fetch("http://localhost:3000/api/todos/" + t._id, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      console.log(json.error);
    }

    if (response.ok) {
      setEdit(true);
      setTodo(json.todo);
    }
  };

  const markTodoAsDone = async () => {
    const response = await fetch(
      "http://localhost:3000/api/todos/done/" + t._id,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const json = await response.json();

    if (!response.ok) {
      console.log(json.error);
    }

    if (response.ok) {
      dispatch({ type: "MARK_TODO_AS_DONE", payload: json });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/api/todos/" + t._id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ todo }),
    });

    const json = await response.json();

    if (!response.ok) {
      console.log(json.error);
    }

    if (response.ok) {
      setEdit(false);
      dispatch({ type: "UPDATE_TODO", payload: json, newTodo: todo });
    }
  };

  const formatCreatedAt = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); // Adjust as needed for your locale and formatting preferences
  };

  return (
    <div className="parent-todo">
      {edit ? (
        <form onSubmit={handleSubmit} className="flex items-center">
          <input
            ref={input}
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            className="mr-2 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          <button className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
            Done
          </button>
        </form>
      ) : (
        <div>
          <div className="todos flex items-center justify-between">
            <p ref={p} className="mr-2">
              {t.todo}
            </p>
            <div className="flex">
              <AiFillDelete
                onClick={deleteTodo}
                size={25}
                className="mr-2 cursor-pointer text-black hover:text-red-700"
                title="Delete"
              />

              {!t.done && (
                <AiFillEdit
                  size={25}
                  className="mr-2 cursor-pointer text-black hover:text-blue-700"
                  title="Edit"
                  onClick={editTodo}
                />
              )}

              {!t.done && (
                <MdOutlineDownloadDone
                  onClick={markTodoAsDone}
                  size={25}
                  className="cursor-pointer text-black hover:text-green-800"
                  title="Done"
                />
              )}
            </div>
          </div>
          <span>{formatCreatedAt(t.createdAt)}</span>
        </div>
      )}
    </div>
  );
}

export default Todos;
