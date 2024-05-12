export const generateWeekRange = (
  start: number,
  stop: number,
  step: number
): number[] =>
  Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
