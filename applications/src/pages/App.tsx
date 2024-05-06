/** @jsxImportSource @emotion/react */
import { Route, Routes } from "react-router-dom";
import { CounterTemplate } from "../components/templates/Counter";
import { TodoListTemplate } from "../components/templates/TodoList";
import { NotFound } from "../components/templates/NotFound";
import { HomeTemplate } from "../components/templates/Home";
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
      <Routes>
        <Route path="/" element={<HomeTemplate />} />
        <Route path="/counter" element={<CounterTemplate />} />
        <Route path="/todolist" element={<TodoListTemplate />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
