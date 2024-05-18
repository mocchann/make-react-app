import { prefectures } from "../constants/prefectures";
import { weatherDataType } from "../types/weatherDataType";
import { getWeatherForecast } from "./getWeatherForecast";

type Props = {
  setWeatherData: React.Dispatch<React.SetStateAction<weatherDataType>>;
};

export const Button = ({ setWeatherData }: Props): JSX.Element => {
  return (
    <button
      onClick={() =>
        getWeatherForecast({ setWeatherData, prefecture: prefectures.tokyo })
      }
    >
      {prefectures.tokyo.name}
    </button>
  );
};
