export type CountProps = {
  count: number;
};

export const DisplayCount = ({ count }: CountProps): JSX.Element => (
  <p>{count}</p>
);
