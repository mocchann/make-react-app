import { fetchWeatherApi } from "openmeteo";
import { dailyWeatherVariables } from "../constants/dailyWeatherVariables";
import { OPEN_API_URL } from "../constants/openApiUrl";
import { weatherDataType } from "../types/weatherDataType";
import { generateWetherCondition } from "./generateWetherCondition";

export const execApiAndSetWeatherData = async (
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

  const fetchWeatherApiResult = generateWetherCondition(responses[0].daily());

  setWeatherData((beforeWeatherData) => ({
    ...beforeWeatherData,
    weatherCondition: fetchWeatherApiResult.weatherCondition,
  }));
};
