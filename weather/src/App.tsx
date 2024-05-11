import { useState, useEffect } from "react";
import { displayWeatherPattern } from "./components/DisplayWeatherPattern";
import { fetchWeatherApi } from "openmeteo";

export const Weather = () => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [currentWeather, setCurrentWeather] = useState<string>("");

  const fetchWeatherData = async (latitude: number, longitude: number) => {
    console.log(latitude, longitude);
    await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setWeatherData(data);
      });
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
    if (weatherData) {
      const currentWeather = displayWeatherPattern(weatherData);
      setCurrentWeather(currentWeather);
    }
  }, [weatherData]);

  return (
    <>
      <h2>Weather App</h2>
      <p>現在の天気: {currentWeather}</p>
      <p>気温: {weatherData?.current_weather.temperature}°C</p>
    </>
  );
};
