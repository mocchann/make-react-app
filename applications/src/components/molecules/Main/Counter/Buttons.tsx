import { DecrementButton } from "../../../atoms/Main/Counter/Button/DecrementButton";
import { IncrementButton } from "../../../atoms/Main/Counter/Button/IncrementButton";
import { ResetButton } from "../../../atoms/Main/Counter/Button/ResetButton";

export const Buttons = (): JSX.Element => {
  return (
    <>
      <IncrementButton />
      <DecrementButton />
      <ResetButton />
    </>
  );
};
