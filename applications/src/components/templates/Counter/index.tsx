/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { createContext, useState } from "react";
import { Counter } from "../../organisms/Main/Counter/Counter";
import { HeaderItems } from "../../organisms/Header/HeaderItems";

type CountContextType = {
  count: number;
  setCount: (count: number) => void;
  handleIncrement: () => void;
  handleDecrement: () => void;
  handleReset: () => void;
};

export const CountContext = createContext<CountContextType>(
  {} as CountContextType
);

export const CounterTemplate = (): JSX.Element => {
  const [count, setCount] = useState(0);

  const handleIncrement = (): void => {
    setCount(count + 1);
  };

  const handleDecrement = (): void => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const handleReset = (): void => {
    setCount(0);
  };

  const button = css`
    button {
      border-radius: 8px;
      border: 1px solid transparent;
      padding: 0.6em 1.2em;
      font-size: 1em;
      font-weight: 500;
      font-family: inherit;
      color: white;
      background-color: #646cff;
      cursor: pointer;
      transition: border-color 0.25s;
    }
    button:hover {
      border-color: #646cff;
      color: #646cff;
      background-color: white;
      transition: 0.3s;
    }
    button:focus,
    button:focus-visible {
      outline: 4px auto -webkit-focus-ring-color;
    }
    button:disabled {
      cursor: not-allowed;
      background-color: #ccc;
      &:hover {
        border-color: transparent;
        color: white;
        background-color: #ccc;
      }
    }
  `;

  const p = css`
    p {
      font-size: 24px;
      font-weight: bold;
      letter-spacing: 1.2px;
      color: #646cff;
    }
  `;

  return (
    <>
      <HeaderItems />
      <div css={[button, p]}>
        <CountContext.Provider
          value={{
            count,
            setCount,
            handleIncrement,
            handleDecrement,
            handleReset,
          }}
        >
          <Counter />
        </CountContext.Provider>
      </div>
    </>
  );
};
