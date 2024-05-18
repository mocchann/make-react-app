import { prefLocation } from "../constants/prefLocation";
import { getWeatherForecast } from "./getWeatherForecast";

type Props = {
  setDisplayLocation: React.Dispatch<React.SetStateAction<string>>;
  locationKey: keyof typeof prefLocation;
};

export const PrefButton = ({ setDisplayLocation, locationKey }: Props): JSX.Element => {
  return (
    <button
      onClick={() =>
        getWeatherForecast({
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
