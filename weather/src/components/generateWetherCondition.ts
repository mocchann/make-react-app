import { VariablesWithTime } from "@openmeteo/sdk/variables-with-time";
import { generateWeeklyWeatherDateTime } from "./generateWeeklyWeatherDateTime";
import { getWeatherConditionValues } from "./getWeatherConditionValues";
import { weatherDataType } from "../types/weatherDataType";

/**
 * useStateに天気情報をセットするためにオブジェクトをデータ加工して返す
 */
export const generateWetherCondition = (
  daily: VariablesWithTime | null
): Pick<weatherDataType, "weatherCondition"> => {
  const weeklyWeatherDateTime = generateWeeklyWeatherDateTime(daily);
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
