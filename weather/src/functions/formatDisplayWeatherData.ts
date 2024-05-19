import { translateWeatherCode } from "../helpers/translateWeatherCode";
import { formatDayOfTheWeek } from "../helpers/formatDayOfTheWeek";
import { WeatherDataType } from "../types/WeatherDataType";
import { DisplayWeatherDataType } from "../types/DisplayWeatherDataType";

type Props = {
  weatherCondition: WeatherDataType["weatherCondition"];
};

/**
 * front表示のためオブジェクトから各天気データを取り出す
 */
export const formatDisplayWeatherData = ({
  weatherCondition,
}: Props): DisplayWeatherDataType[] => {
  return weatherCondition.weeklyWeatherDateTimes.map(
    (_, i: number): DisplayWeatherDataType => {
      const weeklyWeatherDateTime = formatDayOfTheWeek(
        weatherCondition.weeklyWeatherDateTimes[i].toString()
      );
      const weatherString = translateWeatherCode(
        weatherCondition.weatherCodes[i]
      );
      const temperature2mMax = weatherCondition.temperatures2mMax[i].toFixed(1);
      const temperature2mMin = weatherCondition.temperatures2mMin[i].toFixed(1);
      const precipitationProbabilityMean =
        weatherCondition.precipitationProbabilitiesMean[i].toFixed(1);

      return {
        weeklyWeatherDateTime,
        weatherString,
        temperature2mMax,
        temperature2mMin,
        precipitationProbabilityMean,
      };
    }
  );
};
