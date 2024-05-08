import { useEffect, useState } from "react";

export const Weather = () => {
  const [weatherData, setWeatherData] = useState<any>(null);

  useEffect(() => {
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=YOUR_LATITUDE&longitude=YOUR_LONGITUDE"
    )
      .then((response) => response.json())
      .then((data) => setWeatherData(data));
  }, []);

  return (
    <>
      {weatherData && (
        <>
          <h2>Weather App</h2>
          <p>Temperature: {weatherData.temperature}°C</p>
          <p>Humidity: {weatherData.humidity}%</p>
        </>
      )}
    </>
  );
};
