import { VariablesWithTime } from "@openmeteo/sdk/variables-with-time";
import { generateWeeklyWeatherDateTime } from "./generateWeeklyWeatherDateTime";
import { getDailyVariableValues } from "./getDailyVariableValues";
import { weatherDailyType } from "../types/weatherDailyType";

export const generateDailyWeatherData = (
  daily: VariablesWithTime | null,
  utcOffsetSeconds: number
): { daily: weatherDailyType } => {
  const weeklyWeatherDateTime = generateWeeklyWeatherDateTime(
    daily,
    utcOffsetSeconds
  );
  const weatherCode = getDailyVariableValues(daily, 0);
  const temperature2mMax = getDailyVariableValues(daily, 1);
  const temperature2mMin = getDailyVariableValues(daily, 2);
  const precipitationProbabilityMean = getDailyVariableValues(daily, 3);

  return {
    daily: {
      weeklyWeatherDateTime,
      weatherCode,
      temperature2mMax,
      temperature2mMin,
      precipitationProbabilityMean,
    },
  };
};
