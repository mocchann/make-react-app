import { useState, useEffect } from "react";
import { weatherDataType } from "./types/weatherDataType";
import { convertWeatherObjectToDisplayWeatherData } from "./components/convertWeatherObjectToDisplayWeatherData";
import { getWeatherForecastCurrentLocation } from "./components/getWeatherForecastCurrentLocation";
import { prefArray } from "./constants/prefArray";
import { PrefButton } from "./components/PrefButton";
import { WeatherDataType } from "./types/WeatherDataType";

const initialWeatherData: WeatherDataType = {
  weatherCondition: {
    weeklyWeatherDateTimes: [],
    weatherCodes: [],
    temperatures2mMax: [],
    temperatures2mMin: [],
    precipitationProbabilitiesMean: [],
  },
};

export const Weather = () => {
  const [weatherData, setWeatherData] =
    useState<WeatherDataType>(initialWeatherData);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [displayLocation, setDisplayLocation] = useState<string>("");

  useEffect(() => {
    execute();
  }, []);

  const execute = async () => {
    const result = await getWeatherForecastCurrentLocation();

    if (!result) {
      console.error("天気情報の取得に失敗");
      return;
    }

    setDisplayLocation("現在地");
    if (
      JSON.stringify(weatherData.weatherCondition) ===
      JSON.stringify(result.weatherCondition)
    ) {
      return;
    }
    setWeatherData((beforeWeatherData) => ({
      ...beforeWeatherData,
      weatherCondition: result.weatherCondition,
    }));
    setIsLoading(false);
  };

  const formattedWeatherData = formatDisplayWeatherData(weatherData);

  const prefArray = useMemo(() => generatePrefectures(), []);

  return (
    <>
      <h1>Weather App</h1>
      <button onClick={execute}>現在地</button>
      {prefArray.map((locationKey, i) => (
        <PrefButton
          key={i}
          setWeatherData={setWeatherData}
          setDisplayLocation={setDisplayLocation}
          locationKey={locationKey}
        />
      ))}
      {isLoading && <p>お天気情報を取得中っだよおおおおおお...</p>}
      {formattedWeatherData.map((data, i: number) => (
        <DisplayWeather
          key={i}
          data={data}
          i={i}
          displayLocation={displayLocation}
        />
      ))}
    </>
  );
};
