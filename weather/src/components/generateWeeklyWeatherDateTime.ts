import { generateWeekRange } from "./generateWeekRange";
import { VariablesWithTime } from "@openmeteo/sdk/variables-with-time";

export const generateWeeklyWeatherDateTime = (
  weatherCondition: VariablesWithTime | null,
  utcOffsetSeconds: number
): Date[] => {
  if (!weatherCondition) return [];

  const weekRange = generateWeekRange(
    Number(weatherCondition.time()),
    Number(weatherCondition.timeEnd()),
    weatherCondition.interval()
  );

  return weekRange.map((t) => new Date((t + utcOffsetSeconds) * 1000));
};
