import { fetchWeatherApi } from "openmeteo";
import { dailyWeatherVariables } from "../constants/dailyWeatherVariables";
import { OPEN_API_URL } from "../constants/openApiUrl";
import { formatWeatherVariables } from "./formatWeatherVariables";
import { WeatherDataType } from "../types/WeatherDataType";

export const execApiRequest = async (
  latitude: number,
  longitude: number
): Promise<WeatherDataType> => {
  const requestParams = {
    latitude: latitude,
    longitude: longitude,
    daily: dailyWeatherVariables,
  };

  const responses = await fetchWeatherApi(OPEN_API_URL, requestParams);

  return formatWeatherVariables(responses[0].daily());
};
