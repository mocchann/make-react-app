import { useState, useEffect } from "react";
import { getWeatherFromCode } from "./components/getWeatherFromCode";
import { getDayOfWeek } from "./components/getDayOfWeek";
import { weatherDataType } from "./types/weatherDataType";
import { execApiAndSetWeatherData } from "./components/execApiAndSetWeatherData";

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

  const formattedWeatherData =
    weatherData.weatherCondition.weeklyWeatherDateTime.map((_, i: number) => {
      const weeklyWeatherDateTime = getDayOfWeek(
        weatherData.weatherCondition.weeklyWeatherDateTime[i].toString()
      );
      const wether = getWeatherFromCode(
        weatherData.weatherCondition.weatherCode[i]
      );
      const temperature2mMax =
        weatherData.weatherCondition.temperature2mMax[i].toFixed(1);
      const temperature2mMin =
        weatherData.weatherCondition.temperature2mMin[i].toFixed(1);
      const precipitationProbabilityMean =
        weatherData.weatherCondition.precipitationProbabilityMean[i].toFixed(1);

      return {
        weeklyWeatherDateTime,
        wether,
        temperature2mMax,
        temperature2mMin,
        precipitationProbabilityMean,
      };
    });

  return (
    <>
      <h1>Weather App</h1>
      {
        <>
          {formattedWeatherData.map((data, i) => (
            <div key={i}>
              {i === 0 && <h2>今日の天気</h2>}
              {i === 1 && <h2>週間天気予報</h2>}
              <hr />
              <p>{data.weeklyWeatherDateTime}</p>
              <p>{`天気: ${data.wether}`}</p>
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
