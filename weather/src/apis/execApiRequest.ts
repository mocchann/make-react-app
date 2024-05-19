import { fetchWeatherApi } from "openmeteo";
import { VariablesWithTime } from "@openmeteo/sdk/variables-with-time";
import { dailyWeatherVariables } from "../constants/dailyWeatherVariables";
import { OPEN_API_URL } from "../constants/openApiUrl";

export const execApiRequest = async (
  latitude: number,
  longitude: number
): Promise<VariablesWithTime | null> => {
  const requestParams = {
    latitude: latitude,
    longitude: longitude,
    daily: dailyWeatherVariables,
  };

  const responses = await fetchWeatherApi(OPEN_API_URL, requestParams);

  return responses[0].daily();
};
