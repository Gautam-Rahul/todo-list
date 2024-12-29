import { useState } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const handleEdit = (id) => {
    // Logic for editing a task
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((item) => item.id !== id));
  };

  const handleAdd = () => {
    if (todo.trim() === "") return; // Prevent adding empty tasks
    setTodos([...todos, { id: uuidv4(), todo, iscompleted: false }]);
    setTodo(""); // Clear the input field
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((item) =>
        item.id === id ? { ...item, iscompleted: !item.iscompleted } : item
      )
    );
  }; 

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 p-5 bg-violet-100 rounded-xl min-h-[70vh]">
        <div className="addTodo">
          <h2 className="text-lg font-bold">Add a Todo</h2>
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="w-1/3"
          />
          <button
            onClick={handleAdd}
            className="bg-violet-300 hover:bg-violet-400 p-3 py-1 text-black rounded-md mx-5 text-sm font-bold"
          >
            Add
          </button>
        </div>
        <h2 className="text-lg font-bold">Your Todo List</h2>
        <div className="todos">
          {todos.map((item) => {
            if (!item || !item.todo) return null; // Handle invalid items
            return (
              <div
                key={item.id}
                className="todo flex w-1/2 my-3 justify-between items-center"
              >
                <input
                  type="checkbox"
                  checked={item.iscompleted}
                  onChange={() => toggleComplete(item.id)}
                />
                <div className={item.iscompleted ? "line-through" : ""}>
                  {item.todo}
                </div>
                <div className="buttons">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="bg-violet-300 hover:bg-violet-400 p-3 py-1 text-black rounded-md mx-1 text-sm font-bold"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-violet-300 hover:bg-violet-400 p-3 py-1 text-black rounded-md mx-1 text-sm font-bold"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
