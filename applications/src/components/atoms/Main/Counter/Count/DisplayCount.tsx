import { useContext } from "react";
import { CountContext } from "../../../../templates/Counter";

export const DisplayCount = (): JSX.Element => {
  const { count } = useContext(CountContext);

  return <p>{count}</p>;
};
