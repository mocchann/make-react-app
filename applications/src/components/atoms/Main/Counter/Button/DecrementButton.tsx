import { useContext } from "react";
import { CountContext } from "../../../../templates/Counter";

export const DecrementButton = (): JSX.Element => {
  const { count, handleDecrement } = useContext(CountContext);
  return (
    <button onClick={handleDecrement} disabled={count <= 0}>
      Decrement
    </button>
  );
};
