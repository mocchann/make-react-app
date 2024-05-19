import { weatherDataType } from "../types/weatherDataType";
import { execApiRequest } from "./execApiRequest";

export const getWeatherForecastCurrentLocation = async (): Promise<
  Pick<weatherDataType, "weatherCondition"> | Promise<void>
> => {
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
