import { weatherDailyType } from "./weatherDailyType";

export type weatherDataType = {
  daily: weatherDailyType;
  current_weather: { weathercode: number };
};
