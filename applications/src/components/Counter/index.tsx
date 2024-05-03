import { useState } from "react";

export const Counter = () => {
  const [count, setCount] = useState(0);
  return (
    <>
      <p>Welcome To Counter App</p>
      <button>Add</button>
    </>
  );
};
