export type weatherConditionType = {
  weeklyWeatherDateTime: Date[];
  weatherCode: Float32Array | never[];
  temperature2mMax: Float32Array | never[];
  temperature2mMin: Float32Array | never[];
  precipitationProbabilityMean: Float32Array | never[];
};
