export type WeatherDataType = {
  weatherCondition: {
    weeklyWeatherDateTimes: Date[];
    weatherCodes: Float32Array | never[];
    temperatures2mMax: Float32Array | never[];
    temperatures2mMin: Float32Array | never[];
    precipitationProbabilitiesMean: Float32Array | never[];
  };
};
