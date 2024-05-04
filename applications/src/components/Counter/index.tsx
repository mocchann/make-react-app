import { useState } from "react";

export const Counter = () => {
  const [count, setCount] = useState(0);

  function handleIncrement() {
    setCount(count + 1);
  }

  function handleDecrement() {
    if (count > 0) {
      setCount(count - 1);
    }
  }

  return (
    <>
      <p>Welcome To Counter App</p>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement} disabled={count <= 0}>
        Decrement
      </button>
      <p>{count}</p>
    </>
  );
};
