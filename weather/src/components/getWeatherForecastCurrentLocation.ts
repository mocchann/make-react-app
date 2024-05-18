import { execApiAndSetWeatherData } from "./execApiAndSetWeatherData";

export const getWeatherForecastCurrentLocation = async () => {
  try {
    const position = await new Promise<GeolocationPosition>(
      (resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      }
    );
    const { latitude, longitude } = position.coords;
    return await execApiAndSetWeatherData(latitude, longitude);
  } catch (error) {
    console.error(error);
  }
};
