import { VariablesWithTime } from "@openmeteo/sdk/variables-with-time";
import { generateWeeklyWeatherDateTime } from "./generateWeeklyWeatherDateTime";
import { weatherConditionType } from "../types/weatherConditionType";
import { getWeatherConditionValues } from "./getWeatherConditionValues";

export const generateWetherCondition = (
  weatherCondition: VariablesWithTime | null,
  utcOffsetSeconds: number
): { weatherCondition: weatherConditionType } => {
  const weeklyWeatherDateTime = generateWeeklyWeatherDateTime(
    weatherCondition,
    utcOffsetSeconds
  );
  const weatherCode = getWeatherConditionValues(weatherCondition, 0);
  const temperature2mMax = getWeatherConditionValues(weatherCondition, 1);
  const temperature2mMin = getWeatherConditionValues(weatherCondition, 2);
  const precipitationProbabilityMean = getWeatherConditionValues(
    weatherCondition,
    3
  );

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
