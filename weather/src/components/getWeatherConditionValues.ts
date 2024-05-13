import { VariablesWithTime } from "@openmeteo/sdk/variables-with-time";

export const getWeatherConditionValues = (
  weatherCondition: VariablesWithTime | null,
  index: number
) => {
  return weatherCondition?.variables(index)?.valuesArray() ?? [];
};
