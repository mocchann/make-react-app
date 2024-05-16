/**
 * 年月日を生成するために、time(start)からtimeEnd(stop)までの間隔をinterval(step)に基づいたnumberの配列を返す
 */
export const generateWeekRange = (
  start: number,
  stop: number,
  step: number
): number[] =>
  Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
