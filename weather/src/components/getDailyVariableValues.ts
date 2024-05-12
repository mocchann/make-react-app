import { VariablesWithTime } from "@openmeteo/sdk/variables-with-time";

export const getDailyVariableValues = (
  daily: VariablesWithTime | null,
  index: number
) => {
  return daily?.variables(index)?.valuesArray() ?? [];
};
