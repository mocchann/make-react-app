import {
  CountProps,
  DisplayCount,
} from "../../../atoms/Main/Counter/Count/DisplayCount";
import { CounterTitle } from "../../../atoms/Main/Counter/Title/CounterTitle";
import { Buttons, ButtonsProps } from "../../../molecules/Main/Counter/Buttons";

type CounterProps = ButtonsProps & CountProps;

export const Counter = ({
  count,
  handleIncrement,
  handleDecrement,
  handleReset,
}: CounterProps): JSX.Element => {
  return (
    <>
      <CounterTitle />
      <Buttons
        count={count}
        handleIncrement={handleIncrement}
        handleDecrement={handleDecrement}
        handleReset={handleReset}
      />
      <DisplayCount count={count} />
    </>
  );
};
