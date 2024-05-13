import { weatherConditionType } from "./weatherConditionType";

export type weatherDataType = {
  weatherCondition: weatherConditionType;
  currentWeather: { weathercode: number };
};
