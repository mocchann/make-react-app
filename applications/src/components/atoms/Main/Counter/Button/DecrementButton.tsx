export type decrementButtonProps = {
  count: number;
  handleDecrement: () => void;
};

export const DecrementButton = ({
  count,
  handleDecrement,
}: decrementButtonProps): JSX.Element => {
  return (
    <button onClick={handleDecrement} disabled={count <= 0}>
      Decrement
    </button>
  );
};
