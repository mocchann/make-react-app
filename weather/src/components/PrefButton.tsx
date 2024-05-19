import { prefLocation } from "../constants/prefLocation";
import { weatherDataType } from "../types/weatherDataType";
import { getWeatherForecastPrefLocation } from "./getWeatherForecastPrefLocation";

type Props = {
  setWeatherData: React.Dispatch<React.SetStateAction<weatherDataType>>;
  setDisplayLocation: React.Dispatch<React.SetStateAction<string>>;
  locationKey: keyof typeof prefLocation;
};

export const PrefButton = ({
  setWeatherData,
  setDisplayLocation,
  locationKey,
}: Props): JSX.Element => {
  const handleClick = async (): Promise<void> => {
    const result = await getWeatherForecastPrefLocation({ locationKey });

    if (!result) {
      console.error("天気情報の取得に失敗");
      return;
    }

    setDisplayLocation(prefLocation[locationKey].name);
    setWeatherData((beforeWeatherData) => ({
      ...beforeWeatherData,
      weatherCondition: result.weatherCondition,
    }));
  };

  return (
    <button onClick={handleClick}>{prefLocation[locationKey].name}</button>
  );
};
