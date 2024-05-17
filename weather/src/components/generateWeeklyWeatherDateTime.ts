import { generateWeekRange } from "./generateWeekRange";
import { VariablesWithTime } from "@openmeteo/sdk/variables-with-time";

export const generateWeeklyWeatherDateTime = (
  weatherCondition: VariablesWithTime | null
): Date[] => {
  if (!weatherCondition) return [];

  const weekRange = generateWeekRange(
    // NOTE: BigIntのためNumberに変換
    Number(weatherCondition.time()),
    Number(weatherCondition.timeEnd()),
    weatherCondition.interval()
  );

  // 数値の配列をDateオブジェクトに変換する(Dateオブジェクトはミリ秒で扱うため、秒に変換して返す。これやらないと1970年が出ちゃう)
  return weekRange.map((t) => new Date(t * 1000));
};
