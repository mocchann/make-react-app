import { prefLocation } from "../constants/prefLocation";
import { weatherDataType } from "../types/weatherDataType";
import { execApiRequest } from "./execApiRequest";

type Props = {
  locationKey: keyof typeof prefLocation;
};

export const getWeatherForecastPrefLocation = async ({
  locationKey,
}: Props): Promise<Pick<weatherDataType, "weatherCondition"> | void> => {
  try {
    return await execApiRequest(
      prefLocation[locationKey].latitude,
      prefLocation[locationKey].longitude
    );
  } catch (error) {
    console.error(error);
  }
};
