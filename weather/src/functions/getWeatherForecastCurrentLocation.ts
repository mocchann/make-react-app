import { VariablesWithTime } from "@openmeteo/sdk/variables-with-time";
import { execApiRequest } from "../apis/execApiRequest";

type Props = {
  latitude: number;
  longitude: number;
};

export const getWeatherForecastCurrentLocation = async ({
  latitude,
  longitude,
}: Props): Promise<VariablesWithTime | null | void> => {
  try {
    return await execApiRequest(latitude, longitude);
  } catch (error) {
    console.error(error);
  }
};
