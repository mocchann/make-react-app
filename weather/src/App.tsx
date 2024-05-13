import { useState, useEffect } from "react";
import { getWeatherFromCode } from "./components/getWeatherFromCode";
import { getDayOfWeek } from "./components/getDayOfWeek";
import { weatherDataType } from "./types/weatherDataType";
import { fetchWeatherData } from "./components/fetchWeatherData";

const initialWeatherData: weatherDataType = {
  daily: {
    weeklyWeatherDateTime: [],
    weatherCode: [],
    temperature2mMax: [],
    temperature2mMin: [],
    precipitationProbabilityMean: [],
  },
  current_weather: { weathercode: 0 },
};

export const Weather = () => {
  const [weatherData, setWeatherData] =
    useState<weatherDataType>(initialWeatherData);

  useEffect(() => {
    const fetchWeatherDataWithGeolocation = async () => {
      try {
        const position = await new Promise<GeolocationPosition>(
          (resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          }
        );
        const { latitude, longitude } = position.coords;
        await fetchWeatherData(setWeatherData, latitude, longitude);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWeatherDataWithGeolocation();
  }, []);

  if (!weatherData) return <div>loading...</div>;

  const formattedWeatherData = weatherData.daily.weeklyWeatherDateTime.map(
    (_, i: number) => {
      const weeklyWeatherDateTime = getDayOfWeek(
        weatherData.daily.weeklyWeatherDateTime[i].toString()
      );
      const wetherCode = getWeatherFromCode(weatherData.daily.weatherCode[i]);
      const temperature2mMax = weatherData.daily.temperature2mMax[i].toFixed(1);
      const temperature2mMin = weatherData.daily.temperature2mMin[i].toFixed(1);
      const precipitationProbabilityMean =
        weatherData.daily.precipitationProbabilityMean[i].toFixed(1);

      return {
        weeklyWeatherDateTime,
        wetherCode,
        temperature2mMax,
        temperature2mMin,
        precipitationProbabilityMean,
      };
    }
  );

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
              <p>
                <h3>{data.weeklyWeatherDateTime}</h3>
              </p>
              <p>{`天気: ${data.wetherCode}`}</p>
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
