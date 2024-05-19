import { prefLocation } from "../constants/prefLocation";
import { getWeatherForecastPrefLocation } from "../functions/getWeatherForecastPrefLocation";
import { WeatherDataType } from "../types/WeatherDataType";

type Props = {
  weatherData: WeatherDataType;
  setWeatherData: React.Dispatch<React.SetStateAction<WeatherDataType>>;
  setDisplayLocation: React.Dispatch<React.SetStateAction<string>>;
  locationKey: keyof typeof prefLocation;
};

export const PrefButton = ({
  weatherData,
  setWeatherData,
  setDisplayLocation,
  locationKey,
}: Props): JSX.Element => {
  const execute = async (): Promise<void> => {
    const result = await getWeatherForecastPrefLocation({ locationKey });

    if (!result) {
      console.error("天気情報の取得に失敗");
      return;
    }

    if (
      JSON.stringify(weatherData.weatherCondition) ===
      JSON.stringify(result.weatherCondition)
    ) {
      return;
    }

    setDisplayLocation(prefLocation[locationKey].name);
    setWeatherData((beforeWeatherData) => ({
      ...beforeWeatherData,
      weatherCondition: result.weatherCondition,
    }));
  };

  return <button onClick={execute}>{prefLocation[locationKey].name}</button>;
};
