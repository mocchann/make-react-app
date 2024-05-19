import { VariablesWithTime } from "@openmeteo/sdk/variables-with-time";
import { WeatherDataType } from "../types/WeatherDataType";
import { calculateWeekNumbers } from "../helpers/calculateWeekNumbers";

/**
 * useStateに天気情報をセットするためにオブジェクトをデータ加工して返す
 */
export const formatWeatherVariables = (
  dailyWeatherVariables: VariablesWithTime | null
): WeatherDataType => {
  const weekNumbers =
    dailyWeatherVariables ?
    calculateWeekNumbers(
      // NOTE: BigIntのためNumberに変換
      Number(dailyWeatherVariables.time()),
      Number(dailyWeatherVariables.timeEnd()),
      dailyWeatherVariables.interval()
    ) : [];

  // UNIXタイムスタンプの配列をDateオブジェクトに変換する(Dateオブジェクトはミリ秒で扱うため(t * 1000)変換して返す。これやらないと1970年が出ちゃう)
  const weeklyWeatherDateTimes = weekNumbers.map((t) => new Date(t * 1000));
  const weatherCodes = dailyWeatherVariables?.variables(0)?.valuesArray() ?? [];
  const temperatures2mMax =
    dailyWeatherVariables?.variables(1)?.valuesArray() ?? [];
  const temperatures2mMin =
    dailyWeatherVariables?.variables(2)?.valuesArray() ?? [];
  const precipitationProbabilitiesMean =
    dailyWeatherVariables?.variables(3)?.valuesArray() ?? [];

  return {
    weatherCondition: {
      weeklyWeatherDateTimes,
      weatherCodes,
      temperatures2mMax,
      temperatures2mMin,
      precipitationProbabilitiesMean,
    },
  };
};
