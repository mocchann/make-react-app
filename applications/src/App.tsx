import { Link, Route, Routes } from "react-router-dom";
import { Counter } from "../components/Counter";
import { TodoList } from "../components/TodoList";
import { NotFound } from "../components/NotFound";
import { Home } from "../components/Home";

function App() {
  return (
    <>
      <h1>React Applications Menu</h1>
      <p>
        <Link to="/">Home</Link>
      </p>
      <p>
        <Link to="/counter">Counter</Link>
      </p>
      <p>
        <Link to="/todolist">TodoList</Link>
      </p>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/counter" element={<Counter />} />
        <Route path="/todolist" element={<TodoList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
