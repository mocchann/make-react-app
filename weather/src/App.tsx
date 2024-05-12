import { useState, useEffect } from "react";
import { getWeatherFromCode } from "./components/getWeatherFromCode";
import { fetchWeatherApi } from "openmeteo";
import { getDayOfWeek } from "./components/getDayOfWeek";

export const Weather = () => {
  const [weatherData, setWeatherData] = useState<{
    daily: any;
    current_weather: { weathercode: number };
  }>({ daily: {}, current_weather: { weathercode: 0 } });

  const fetchWeatherData = async (latitude: number, longitude: number) => {
    const url = "https://api.open-meteo.com/v1/forecast";
    const params = {
      latitude: latitude,
      longitude: longitude,
      daily: [
        "weather_code",
        "temperature_2m_max",
        "temperature_2m_min",
        "precipitation_probability_mean",
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
        precipitationProbabilityMean: daily?.variables(3)?.valuesArray() ?? [],
      },
    };
    console.log(fetchWeatherApiResult.daily.time);

    setWeatherData((beforeWeatherData) => ({
      ...beforeWeatherData,
      daily: fetchWeatherApiResult.daily,
    }));
  };

  useEffect(() => {
    const handleSuccess = (position: GeolocationPosition) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
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

  return (
    <>
      <h1>Weather App</h1>
      {weatherData &&
        weatherData.daily &&
        weatherData.daily.time &&
        weatherData.daily.weatherCode &&
        weatherData.daily.temperature2mMax &&
        weatherData.daily.temperature2mMin &&
        weatherData.daily.precipitationProbabilityMean && (
          <>
            {weatherData.daily.time.map((_: never, i: number) => (
              <>
                <div key={i}>
                  {i === 0 ? (
                    <h2>今日の天気</h2>
                  ) : (
                    i === 1 && <h2>週間天気予報</h2>
                  )}
                  <hr />
                  <p>
                    <h3>{getDayOfWeek(weatherData.daily.time[i])}</h3>
                  </p>
                  <p>{`天気: ${getWeatherFromCode(
                    weatherData.daily.weatherCode[i]
                  )}`}</p>
                  <p>
                    {`最高気温: ${weatherData.daily.temperature2mMax[i].toFixed(
                      1
                    )} °C`}
                  </p>
                  <p>
                    {`最低気温: ${weatherData.daily.temperature2mMin[i].toFixed(
                      1
                    )} °C`}
                  </p>
                  <p>{`降水確率: ${weatherData.daily.precipitationProbabilityMean[
                    i
                  ].toFixed(1)} %`}</p>
                </div>
              </>
            ))}
          </>
        )}
    </>
  );
};
