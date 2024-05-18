import { prefLocation } from "../constants/prefLocation";
import { execApiAndSetWeatherData } from "./execApiAndSetWeatherData";

type Props = {
  setDisplayLocation: React.Dispatch<React.SetStateAction<string>>;
  prefLocation: typeof prefLocation;
  locationKey: keyof typeof prefLocation;
};

export const getWeatherForecast = async ({
  setDisplayLocation,
  prefLocation,
  locationKey,
}: Props): Promise<void> => {
  try {
    await execApiAndSetWeatherData(
      prefLocation[locationKey].latitude,
      prefLocation[locationKey].longitude
    );
    setDisplayLocation(prefLocation[locationKey].name);
  } catch (error) {
    console.error(error);
  }
};
