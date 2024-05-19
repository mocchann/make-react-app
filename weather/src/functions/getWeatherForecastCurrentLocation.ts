import { execApiRequest } from "../apis/execApiRequest";
import { WeatherDataType } from "../types/WeatherDataType";

export const getWeatherForecastCurrentLocation = async (): Promise<
  WeatherDataType | Promise<void>
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
