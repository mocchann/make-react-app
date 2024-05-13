import { VariablesWithTime } from "@openmeteo/sdk/variables-with-time";
import { generateWeeklyWeatherDateTime } from "./generateWeeklyWeatherDateTime";
import { weatherConditionType } from "../types/weatherConditionType";
import { getWeatherConditionValues } from "./getWeatherConditionValues";

export const generateWetherCondition = (
  daily: VariablesWithTime | null,
  utcOffsetSeconds: number
): { weatherCondition: weatherConditionType } => {
  const weeklyWeatherDateTime = generateWeeklyWeatherDateTime(
    daily,
    utcOffsetSeconds
  );
  const weatherCode = getWeatherConditionValues(daily, 0);
  const temperature2mMax = getWeatherConditionValues(daily, 1);
  const temperature2mMin = getWeatherConditionValues(daily, 2);
  const precipitationProbabilityMean = getWeatherConditionValues(daily, 3);

  return {
    weatherCondition: {
      weeklyWeatherDateTime,
      weatherCode,
      temperature2mMax,
      temperature2mMin,
      precipitationProbabilityMean,
    },
  };
};
