/**
 * 年月日を生成するために、time(start)からtimeEnd(stop)までの間隔をinterval(step)に基づいたnumberの配列を返す
 * ex. generateWeekRange(0, 10, 2) => [0, 2, 4, 6, 8]
 * HACK: この実装直感的にわかりづらすぎるのでどうにかしたい
 */
export const generateWeekRange = (
  start: number,
  stop: number,
  step: number
): number[] =>
  Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
