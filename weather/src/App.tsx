import { useState, useEffect } from "react";

export const Weather = () => {
  const [weatherData, setWeatherData] = useState<any>(null);

  const fetchWeatherData = async (latitude: any, longitude: any) => {
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

  return (
    <>
      {weatherData && (
        <>
          <h2>Weather App</h2>
          <p>気温: {weatherData.current_weather.temperature}°C</p>
        </>
      )}
    </>
  );
};
