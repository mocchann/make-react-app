import { fetchWeatherApi } from "openmeteo";
import { dailyWeatherVariables } from "../constants/dailyWeatherVariables";
import { OPEN_API_URL } from "../constants/openApiUrl";
import { generateDailyWeatherData } from "./generateDailyWeatherData";
import { weatherDataType } from "../types/weatherDataType";

export const fetchWeatherData = async (
  setWeatherData: React.Dispatch<React.SetStateAction<weatherDataType>>,
  latitude: number,
  longitude: number
): Promise<void> => {
  const requestParams = {
    latitude: latitude,
    longitude: longitude,
    daily: dailyWeatherVariables,
  };

  const responses = await fetchWeatherApi(OPEN_API_URL, requestParams);

  const fetchWeatherApiResult = generateDailyWeatherData(
    responses[0].daily(),
    responses[0].utcOffsetSeconds()
  );

  setWeatherData((beforeWeatherData) => ({
    ...beforeWeatherData,
    daily: fetchWeatherApiResult.daily,
  }));
};
