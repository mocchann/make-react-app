/** @jsxImportSource @emotion/react */
import { Link, Route, Routes } from "react-router-dom";
import { Counter } from "../components/Counter";
import { TodoList } from "../components/TodoList";
import { NotFound } from "../components/NotFound";
import { Home } from "../components/Home";
import { css } from "@emotion/react";

function App() {
  const style = css`
    text-align: center;
    margin-top: 100px;
    button {
      margin: 0 10px;
    }
    a {
      font-weight: 500;
      color: #646cff;
      text-decoration: inherit;
    }
    a:hover {
      color: #535bf2;
    }
    h1 {
      font-size: 32px;
      font-weight: bold;
      letter-spacing: 1.2px;
      color: #646cff;
    }
  `;

  return (
    <div css={style}>
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
    </div>
  );
}

export default App;
