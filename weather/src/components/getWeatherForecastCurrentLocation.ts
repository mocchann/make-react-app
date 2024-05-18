import React from "react";
import { execApiAndSetWeatherData } from "./execApiAndSetWeatherData";
import { weatherDataType } from "../types/weatherDataType";

export const getWeatherForecastCurrentLocation = async (
  setWeatherData: React.Dispatch<React.SetStateAction<weatherDataType>>
) => {
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
