import { prefLocation } from "../constants/prefLocation";
import { weatherDataType } from "../types/weatherDataType";
import { execApiAndSetWeatherData } from "./execApiAndSetWeatherData";

type Props = {
  setWeatherData: React.Dispatch<React.SetStateAction<weatherDataType>>;
  setDisplayLocation: React.Dispatch<React.SetStateAction<string>>;
  prefLocation: typeof prefLocation;
  locationKey: keyof typeof prefLocation;
};

export const getWeatherForecast = async ({
  setWeatherData,
  setDisplayLocation,
  prefLocation,
  locationKey,
}: Props): Promise<void> => {
  try {
    await execApiAndSetWeatherData(
      setWeatherData,
      prefLocation[locationKey].latitude,
      prefLocation[locationKey].longitude
    );
    setDisplayLocation(prefLocation[locationKey].name);
  } catch (error) {
    console.error(error);
  }
};
