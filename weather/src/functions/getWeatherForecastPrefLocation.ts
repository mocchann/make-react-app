import { VariablesWithTime } from "@openmeteo/sdk/variables-with-time";
import { prefLocation } from "../constants/prefLocation";
import { execApiRequest } from "../apis/execApiRequest";

type Props = {
  locationKey: keyof typeof prefLocation;
};

export const getWeatherForecastPrefLocation = async ({
  locationKey,
}: Props): Promise<VariablesWithTime | null | void> => {
  try {
    return await execApiRequest(
      prefLocation[locationKey].latitude,
      prefLocation[locationKey].longitude
    );
  } catch (error) {
    console.error(error);
  }
};
