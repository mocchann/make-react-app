import { DisplayCount } from "../../../atoms/Main/Counter/Count/DisplayCount";
import { CounterTitle } from "../../../atoms/Main/Counter/Title/CounterTitle";
import { Buttons } from "../../../molecules/Main/Counter/Buttons";

export const Counter = (): JSX.Element => {
  return (
    <>
      <CounterTitle />
      <Buttons />
      <DisplayCount />
    </>
  );
};
