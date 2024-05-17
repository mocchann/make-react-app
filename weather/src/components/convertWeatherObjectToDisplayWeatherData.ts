import { weatherConditionType } from "../types/weatherConditionType";
import { getDayOfWeek } from "./getDayOfWeek";
import { getWeatherFromCode } from "./getWeatherFromCode";

export const convertWeatherObjectToDisplayWeatherData = (
  weatherCondition: weatherConditionType
) => {
  return weatherCondition.weeklyWeatherDateTime.map((_, i: number) => {
    const weeklyWeatherDateTime = getDayOfWeek(
      weatherCondition.weeklyWeatherDateTime[i].toString()
    );
    const weather = getWeatherFromCode(weatherCondition.weatherCode[i]);
    const temperature2mMax = weatherCondition.temperature2mMax[i].toFixed(1);
    const temperature2mMin = weatherCondition.temperature2mMin[i].toFixed(1);
    const precipitationProbabilityMean =
      weatherCondition.precipitationProbabilityMean[i].toFixed(1);

    return {
      weeklyWeatherDateTime,
      weather,
      temperature2mMax,
      temperature2mMin,
      precipitationProbabilityMean,
    };
  });
};
