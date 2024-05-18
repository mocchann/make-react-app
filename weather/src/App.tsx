import { useState, useEffect } from "react";
import { weatherDataType } from "./types/weatherDataType";
import { execApiAndSetWeatherData } from "./components/execApiAndSetWeatherData";
import { convertWeatherObjectToDisplayWeatherData } from "./components/convertWeatherObjectToDisplayWeatherData";
import { saitamaLocation } from "./constants/SaitamaLocation";
import { chibaLocation } from "./constants/chibaLocation";
import { kanagawaLocation } from "./constants/kanagawaLocation";
import { tokyoLocation } from "./constants/tokyoLocation";

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

  // 現在地の天気予報を取得
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

  // 東京の天気予報を取得
  const getWeatherForecastTokyo = async () => {
    try {
      await execApiAndSetWeatherData(
        setWeatherData,
        tokyoLocation.latitude,
        tokyoLocation.longitude
      );
    } catch (error) {
      console.error(error);
    }
  };

  // 埼玉の天気予報を取得
  const getWeatherForecastSaitama = async () => {
    try {
      await execApiAndSetWeatherData(
        setWeatherData,
        saitamaLocation.latitude,
        saitamaLocation.longitude
      );
    } catch (error) {
      console.error(error);
    }
  };

  // 千葉の天気予報を取得
  const getWeatherForecastChiba = async () => {
    try {
      await execApiAndSetWeatherData(
        setWeatherData,
        chibaLocation.latitude,
        chibaLocation.longitude
      );
    } catch (error) {
      console.error(error);
    }
  };

  // 神奈川の天気予報を取得
  const getWeatherForecastKanagawa = async () => {
    try {
      await execApiAndSetWeatherData(
        setWeatherData,
        kanagawaLocation.latitude,
        kanagawaLocation.longitude
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getWeatherForecastCurrentLocation();
  }, []);

  if (!weatherData) return <div>loading...</div>;

  const formattedWeatherData = convertWeatherObjectToDisplayWeatherData(
    weatherData.weatherCondition
  );

  return (
    <>
      <h1>Weather App</h1>
      <button onClick={getWeatherForecastTokyo}>東京</button>
      <button onClick={getWeatherForecastSaitama}>埼玉</button>
      <button onClick={getWeatherForecastChiba}>千葉</button>
      <button onClick={getWeatherForecastKanagawa}>神奈川</button>
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
