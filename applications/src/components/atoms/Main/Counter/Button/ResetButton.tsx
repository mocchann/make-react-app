export type ResetButtonProps = {
  count: number;
  handleReset: () => void;
};

export const ResetButton = ({
  handleReset,
  count,
}: ResetButtonProps): JSX.Element => {
  return (
    <button onClick={handleReset} disabled={count <= 0}>
      Reset
    </button>
  );
};
