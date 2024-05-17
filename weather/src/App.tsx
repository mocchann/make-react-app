import { useState, useEffect } from "react";
import { weatherDataType } from "./types/weatherDataType";
import { execApiAndSetWeatherData } from "./components/execApiAndSetWeatherData";
import { convertWeatherObjectToDisplayWeatherData } from "./components/convertWeatherObjectToDisplayWeatherData";

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

  useEffect(() => {
    const getWeatherForecastCurrentLocation = async () => {
      try {
        const position = await new Promise<GeolocationPosition>(
          (resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          }
        );
        const { latitude, longitude } = position.coords;
        await execApiAndSetWeatherData(setWeatherData, latitude, longitude);
      } catch (error) {
        console.error(error);
      }
    };

    getWeatherForecastCurrentLocation();
  }, []);

  if (!weatherData) return <div>loading...</div>;

  const formattedWeatherData = convertWeatherObjectToDisplayWeatherData(
    weatherData.weatherCondition
  );

  return (
    <>
      <h1>Weather App</h1>
      {
        <>
          {formattedWeatherData.map((data, i: number) => (
            <div key={i}>
              {i === 0 && <h2>今日の天気</h2>}
              {i === 1 && <h2>週間天気予報</h2>}
              <hr />
              <p>{data.weeklyWeatherDateTime}</p>
              <p>{`天気: ${data.weather}`}</p>
              <p>{`最高気温: ${data.temperature2mMax} °C`}</p>
              <p>{`最低気温: ${data.temperature2mMin} °C`}</p>
              <p>{`降水確率: ${data.precipitationProbabilityMean} %`}</p>
            </div>
          ))}
        </>
      }
    </>
  );
};
