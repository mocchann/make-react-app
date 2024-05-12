import { generateWeekRange } from "./generateWeekRange";
import { VariablesWithTime } from "@openmeteo/sdk/variables-with-time";

export const generateWeeklyWeatherDateTime = (
  daily: VariablesWithTime | null,
  utcOffsetSeconds: number
): Date[] => {
  if (!daily) return [];

  const weekRange = generateWeekRange(
    Number(daily.time()),
    Number(daily.timeEnd()),
    daily.interval()
  );

  return weekRange.map((t) => new Date((t + utcOffsetSeconds) * 1000));
};
