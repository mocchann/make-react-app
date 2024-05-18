import { prefLocation } from "../constants/prefLocation";
import { weatherDataType } from "../types/weatherDataType";
import { getWeatherForecast } from "./getWeatherForecast";

type Props = {
  setWeatherData: React.Dispatch<React.SetStateAction<weatherDataType>>;
  setDisplayLocation: React.Dispatch<React.SetStateAction<string>>;
  locationKey: keyof typeof prefLocation;
};

export const Button = ({
  setWeatherData,
  setDisplayLocation,
  locationKey,
}: Props): JSX.Element => {
  return (
    <button
      onClick={() =>
        getWeatherForecast({
          setWeatherData,
          setDisplayLocation,
          prefLocation,
          locationKey,
        })
      }
    >
      {prefLocation[locationKey].name}
    </button>
  );
};
