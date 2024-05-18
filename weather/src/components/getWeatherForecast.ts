import { weatherDataType } from "../types/weatherDataType";
import { execApiAndSetWeatherData } from "./execApiAndSetWeatherData";

type Props = {
  setWeatherData: React.Dispatch<React.SetStateAction<weatherDataType>>;
  prefecture: {
    latitude: number;
    longitude: number;
  };
};

export const getWeatherForecast = async ({
  setWeatherData,
  prefecture,
}: Props): Promise<void> => {
  try {
    await execApiAndSetWeatherData(
      setWeatherData,
      prefecture.latitude,
      prefecture.longitude
    );
  } catch (error) {
    console.error(error);
  }
};
