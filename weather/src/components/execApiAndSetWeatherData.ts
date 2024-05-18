import { fetchWeatherApi } from "openmeteo";
import { dailyWeatherVariables } from "../constants/dailyWeatherVariables";
import { OPEN_API_URL } from "../constants/openApiUrl";
import { generateWetherCondition } from "./generateWetherCondition";
import { weatherDataType } from "../types/weatherDataType";

export const execApiAndSetWeatherData = async (
  latitude: number,
  longitude: number
): Promise<Pick<weatherDataType, "weatherCondition">> => {
  const requestParams = {
    latitude: latitude,
    longitude: longitude,
    daily: dailyWeatherVariables,
  };

  const responses = await fetchWeatherApi(OPEN_API_URL, requestParams);

  return generateWetherCondition(responses[0].daily());
};
