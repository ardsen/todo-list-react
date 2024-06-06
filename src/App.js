import { useState } from "react";

// const todolist = [
//   {
//     id: 1,
//     todo: "Go to school",
//     isCompleted: false,
//   },
//   {
//     id: 2,
//     todo: "Feast time",
//     isCompleted: false,
//   },
//   {
//     id: 3,
//     todo: "Bed time",
//     isCompleted: false,
//   },
// ];

export default function App() {
  const [isAddTodoOpen, setIsAddTodoOpen] = useState(false);
  const [todolist, setTodoList] = useState([
    {
      id: 1,
      todo: "Go to school",
      isCompleted: false,
    },
    {
      id: 2,
      todo: "Feast time",
      isCompleted: false,
    },
    {
      id: 3,
      todo: "Bed time",
      isCompleted: false,
    },
  ]);
  const [filterValue, setFilterValue] = useState("all");
  function handleTodoList(todo) {
    setTodoList((todolist) => [...todolist, todo]);
    setIsAddTodoOpen(false);
  }
  function handleAddTaskClick() {
    setIsAddTodoOpen(true);
  }
  function handleDeleteTodo(id) {
    setTodoList((current) => current.filter((todo) => todo.id !== id));
  }
  function handleCheckBox(id) {
    setTodoList((current) =>
      current.map((x) =>
        x.id === id ? { ...x, isCompleted: !x.isCompleted } : x
      )
    );
  }

  let filteredItems;

  if (filterValue === "all") filteredItems = todolist;

  if (filterValue === "incomplete")
    filteredItems = todolist.slice().filter((e) => e.isCompleted === false);

  if (filterValue === "completed")
    filteredItems = todolist.slice().filter((e) => e.isCompleted === true);
  return (
    <div className="wrapper">
      <div className="container">
        <h1>TODO LIST</h1>
        <div className="top-section">
          <Button handleAddTaskClick={handleAddTaskClick}>Add Task</Button>
          <Filter
            filterValue={filterValue}
            setFilterValue={setFilterValue}
          ></Filter>
        </div>
        <ul className="todo-container">
          {filteredItems.map((e) => (
            <TodoItem
              id={e.id}
              todo={e.todo}
              isCompleted={e.isCompleted}
              key={e.id}
              handleDeleteTodo={handleDeleteTodo}
              handleCheckBox={handleCheckBox}
            ></TodoItem>
          ))}
        </ul>
        {isAddTodoOpen ? (
          <div className="add-todo-wrapper">
            <AddTodo
              isAddTodoOpen={isAddTodoOpen}
              setIsAddTodoOpen={setIsAddTodoOpen}
              setTodoList={setTodoList}
              handleTodoList={handleTodoList}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

function Button({ children, type, handleAddTaskClick }) {
  return (
    <button className="btn" type="type" onClick={handleAddTaskClick}>
      {children}
    </button>
  );
}
function Filter({ filterValue, setFilterValue }) {
  return (
    <select
      value={filterValue}
      onChange={(e) => setFilterValue(e.target.value)}
    >
      <option value="all">All</option>
      <option value="incomplete">Incomplete</option>
      <option value="completed">Completed</option>
    </select>
  );
}
function TodoItem({ id, todo, isCompleted, handleDeleteTodo, handleCheckBox }) {
  return (
    <li className="todo-item">
      <div>
        <input
          type="checkbox"
          className="check-box"
          value={isCompleted}
          onChange={() => handleCheckBox(id)}
        ></input>
        <label>
          {isCompleted ? (
            <del>
              <em>{todo}</em>
            </del>
          ) : (
            todo
          )}
        </label>
      </div>
      <button className="emj-x" onClick={() => handleDeleteTodo(id)}>
        ✖
      </button>
    </li>
  );
}

function AddTodo({
  isAddTodoOpen,
  setIsAddTodoOpen,
  setTodoList,
  handleTodoList,
}) {
  const [todoInput, setTodoInput] = useState("");
  const [optionComplete, setOptionComplete] = useState(false);

  function onTodoSubmit(e) {
    e.preventDefault();

    if (todoInput === "") return;

    const newTodo = {
      id: crypto.randomUUID(),
      todo: todoInput,
      isCompleted: optionComplete,
    };

    console.log(newTodo);

    handleTodoList(newTodo);
    // setIsAddTodoOpen(false);
  }
  // function handleOptionComplete(e) {
  //   setOptionComplete(e);
  // }
  return (
    <div className="add-todo-container" onSubmit={onTodoSubmit}>
      <form className="add-todo-form">
        <h2>Add TODO</h2>
        <label>
          <input
            type="text"
            value={todoInput}
            onChange={(e) => setTodoInput(e.target.value)}
          ></input>
        </label>
        <select onChange={(e) => setOptionComplete(e.target.value)}>
          <option value={false}>Incomplete</option>
          <option value={true}>Completed</option>
        </select>
        <div>
          <Button>Add Task</Button>
          <button
            className="btn"
            type="button"
            onClick={() => setIsAddTodoOpen(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
