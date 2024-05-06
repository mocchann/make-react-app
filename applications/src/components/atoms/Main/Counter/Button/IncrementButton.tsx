export type IncrementButtonProps = {
  handleIncrement: () => void;
};

export const IncrementButton = ({
  handleIncrement,
}: IncrementButtonProps): JSX.Element => {
  return <button onClick={handleIncrement}>Increment</button>;
};
