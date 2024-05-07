import { useContext } from "react";
import { CountContext } from "../../../../templates/Counter";

export const ResetButton = (): JSX.Element => {
  const { count, handleReset } = useContext(CountContext);
  return (
    <button onClick={handleReset} disabled={count <= 0}>
      Reset
    </button>
  );
};
