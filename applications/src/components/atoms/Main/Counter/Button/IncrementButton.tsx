import { useContext } from "react";
import { CountContext } from "../../../../templates/Counter";

export const IncrementButton = (): JSX.Element => {
  const { handleIncrement } = useContext(CountContext);

  return <button onClick={handleIncrement}>Increment</button>;
};
