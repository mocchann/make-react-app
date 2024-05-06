import {
  DecrementButton,
  decrementButtonProps,
} from "../../../atoms/Main/Counter/Button/DecrementButton";
import {
  IncrementButton,
  IncrementButtonProps,
} from "../../../atoms/Main/Counter/Button/IncrementButton";
import {
  ResetButton,
  ResetButtonProps,
} from "../../../atoms/Main/Counter/Button/ResetButton";

export type ButtonsProps = IncrementButtonProps &
  decrementButtonProps &
  ResetButtonProps;

export const Buttons = ({
  count,
  handleIncrement,
  handleDecrement,
  handleReset,
}: ButtonsProps): JSX.Element => {
  return (
    <>
      <IncrementButton handleIncrement={handleIncrement} />
      <DecrementButton count={count} handleDecrement={handleDecrement} />
      <ResetButton count={count} handleReset={handleReset} />
    </>
  );
};
