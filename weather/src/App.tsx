import { useState, useEffect } from "react";
import { weatherDataType } from "./types/weatherDataType";
import { convertWeatherObjectToDisplayWeatherData } from "./components/convertWeatherObjectToDisplayWeatherData";
import { getWeatherForecastCurrentLocation } from "./components/getWeatherForecastCurrentLocation";
import { prefArray } from "./constants/prefArray";
import { PrefButton } from "./components/PrefButton";

const initialWeatherData: weatherDataType = {
  weatherCondition: {
    weeklyWeatherDateTime: [],
    weatherCode: [],
    temperature2mMax: [],
    temperature2mMin: [],
    precipitationProbabilityMean: [],
  },
  currentWeather: { weathercode: 0 },
};

export const Weather = () => {
  const [weatherData, setWeatherData] =
    useState<weatherDataType>(initialWeatherData);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [displayLocation, setDisplayLocation] = useState<string>("現在地");

  useEffect(() => {
    const fetchWeatherData = async () => {
      const result = await getWeatherForecastCurrentLocation();

      if (!result) {
        console.error("天気情報の取得に失敗");
        return;
      }

      setWeatherData((beforeWeatherData) => ({
        ...beforeWeatherData,
        weatherCondition: result.weatherCondition,
      }));
      setIsLoading(false);
    };

    fetchWeatherData();
  }, []);

  const formattedWeatherData = convertWeatherObjectToDisplayWeatherData(
    weatherData.weatherCondition
  );

  return (
    <>
      <h1>Weather App</h1>
      {prefArray.map((locationKey, i) => (
        <PrefButton
          key={i}
          setDisplayLocation={setDisplayLocation}
          locationKey={locationKey}
        />
      ))}
      {isLoading && <p>お天気情報を取得中っだよおおおおおお...</p>}
      {formattedWeatherData.map((data, i: number) => (
        <div key={i}>
          {i === 0 && (
            <>
              <h2>{displayLocation}</h2>
              <h3>今日の天気</h3>
            </>
          )}
          {i === 1 && <h3>週間天気予報</h3>}
          <hr />
          <p>{data.weeklyWeatherDateTime}</p>
          <p>{`天気: ${data.weather}`}</p>
          <p>{`最高気温: ${data.temperature2mMax} °C`}</p>
          <p>{`最低気温: ${data.temperature2mMin} °C`}</p>
          <p>{`降水確率: ${data.precipitationProbabilityMean} %`}</p>
        </div>
      ))}
    </>
  );
};
