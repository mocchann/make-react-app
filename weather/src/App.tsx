import { useState, useEffect } from "react";

export const Weather = () => {
  const [weatherData, setWeatherData] = useState<any>(null);

  const fetchWeatherData = (latitude: any, longitude: any) => {
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}`
    )
      .then((response) => response.json())
      .then((data) => setWeatherData(data));
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      fetchWeatherData(latitude, longitude);
    });
  }, []);

  return (
    <>
      {weatherData && (
        <>
          <h2>Weather App</h2>
          <p>気温: {weatherData.temperature}°C</p>
          <p>湿度: {weatherData.humidity}%</p>
        </>
      )}
    </>
  );
};
