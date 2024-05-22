import { VariablesWithTime } from "@openmeteo/sdk/variables-with-time";
import { execApiRequest } from "../apis/execApiRequest";

export const getWeatherForecastCurrentLocation =
  async (): Promise<VariablesWithTime | null | void> => {
    try {
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        }
      );
      const { latitude, longitude } = position.coords;
      return await execApiRequest(latitude, longitude);
    } catch (error) {
      console.error(error);
    }
  };
