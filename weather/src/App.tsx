import { useState, useEffect } from "react";
import { displayWeatherPattern } from "./components/DisplayWeatherPattern";
import { fetchWeatherApi } from "openmeteo";

export const Weather = () => {
  const [weatherData, setWeatherData] = useState<{
    daily: any;
    current_weather: { weathercode: number };
  }>({ daily: {}, current_weather: { weathercode: 0 } });
  const [currentWeather, setCurrentWeather] = useState<string>("");

  const fetchWeatherData = async (latitude: number, longitude: number) => {
    console.log(latitude, longitude);
    const url = "https://api.open-meteo.com/v1/forecast";
    const params = {
      latitude: latitude,
      longitude: longitude,
      daily: [
        "weather_code",
        "temperature_2m_max",
        "temperature_2m_min",
        "precipitation_probability_max",
        "wind_speed_10m_max",
      ],
    };
    const responses = await fetchWeatherApi(url, params);

    const range = (start: number, stop: number, step: number) =>
      Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

    const response = responses[0];
    const utcOffsetSeconds = response.utcOffsetSeconds();
    const daily = response.daily();

    const fetchWeatherApiResult = {
      daily: {
        time: daily
          ? range(
              Number(daily.time()),
              Number(daily.timeEnd()),
              daily.interval()
            ).map((t) => new Date((t + utcOffsetSeconds) * 1000))
          : [],
        weatherCode: daily?.variables(0)?.valuesArray() ?? [],
        temperature2mMax: daily?.variables(1)?.valuesArray() ?? [],
        temperature2mMin: daily?.variables(2)?.valuesArray() ?? [],
        precipitationProbabilityMax: daily?.variables(3)?.valuesArray() ?? [],
        windSpeed10mMax: daily?.variables(4)?.valuesArray() ?? [],
      },
    };

    setWeatherData((prevData) => ({
      ...prevData,
      daily: fetchWeatherApiResult.daily,
    }));
  };

  useEffect(() => {
    const handleSuccess = (position: GeolocationPosition) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      fetchWeatherData(latitude, longitude);
    };

    const handleError = (error: GeolocationPositionError) => {
      console.error(error);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    console.log(weatherData);
    if (weatherData) {
      const currentWeather = displayWeatherPattern(weatherData);
      setCurrentWeather(currentWeather);
    }
  }, [weatherData]);

  return (
    <>
      <h2>Weather App</h2>
      {weatherData &&
        weatherData.daily &&
        weatherData.daily.temperature2mMax &&
        weatherData.daily.temperature2mMin && (
          <>
            <p>現在の天気: {currentWeather}</p>
            <p>
              最高気温: {weatherData.daily.temperature2mMax[0].toFixed(1)}°C
            </p>
            <p>
              最低気温: {weatherData.daily.temperature2mMin[0].toFixed(1)}°C
            </p>
          </>
        )}
    </>
  );
};
