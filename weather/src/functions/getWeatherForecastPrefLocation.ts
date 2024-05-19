import { prefLocation } from "../constants/prefLocation";
import { execApiRequest } from "../apis/execApiRequest";
import { WeatherDataType } from "../types/WeatherDataType";

type Props = {
  locationKey: keyof typeof prefLocation;
};

export const getWeatherForecastPrefLocation = async ({
  locationKey,
}: Props): Promise<WeatherDataType | void> => {
  try {
    return await execApiRequest(
      prefLocation[locationKey].latitude,
      prefLocation[locationKey].longitude
    );
  } catch (error) {
    console.error(error);
  }
};
