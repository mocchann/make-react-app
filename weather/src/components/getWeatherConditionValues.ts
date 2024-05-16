import { VariablesWithTime } from "@openmeteo/sdk/variables-with-time";

/**
 * オブジェクトから各天気情報(天気、気温、湿度など)の配列を返す
 */
export const getWeatherConditionValues = (
  weatherCondition: VariablesWithTime | null,
  index: number
) => {
  return weatherCondition?.variables(index)?.valuesArray() ?? [];
};
