import { useState, useEffect, useMemo, useCallback } from "react";
import { getWeatherForecastCurrentLocation } from "./functions/getWeatherForecastCurrentLocation";
import { generatePrefectures } from "./helpers/generatePrefectures";
import { PrefButton } from "./components/PrefButton";
import { formatDisplayWeatherData } from "./functions/formatDisplayWeatherData";
import { DisplayWeather } from "./components/DisplayWeather";
import { WeatherDataType } from "./types/WeatherDataType";
import { formatWeatherVariables } from "./functions/formatWeatherVariables";

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

  const execute = useCallback(
    async (latitude: number, longitude: number): Promise<void> => {
      const dailyWeatherVariables = await getWeatherForecastCurrentLocation({
        latitude,
        longitude,
      });

      if (!dailyWeatherVariables) {
        console.error("天気情報の取得に失敗");
        return;
      }

      const result = formatWeatherVariables(dailyWeatherVariables);

      if (
        JSON.stringify(weatherData.weatherCondition) ===
        JSON.stringify(result.weatherCondition)
      ) {
        return;
      }

      setDisplayLocation("現在地");
      setWeatherData((beforeWeatherData) => ({
        ...beforeWeatherData,
        weatherCondition: result.weatherCondition,
      }));
      setIsLoading(false);
    },
    []
  );

  const getPosition = async () => {
    const position = await new Promise<GeolocationPosition>(
      (resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      }
    );
    const { latitude, longitude } = position.coords;
    execute(latitude, longitude);
  };

  useEffect(() => {
    getPosition();
  }, [execute]);

  const formattedWeatherData = useMemo(
    () => formatDisplayWeatherData(weatherData),
    [weatherData]
  );

  const prefArray = useMemo(() => generatePrefectures(), []);

  return (
    <>
      <h1>Weather App</h1>
      <button onClick={getPosition}>現在地</button>
      {prefArray.map((locationKey, i) => (
        <PrefButton
          key={i}
          weatherData={weatherData}
          setWeatherData={setWeatherData}
          setDisplayLocation={setDisplayLocation}
          locationKey={locationKey}
        />
      ))}
      {isLoading && <p>お天気情報を取得中...</p>}
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
