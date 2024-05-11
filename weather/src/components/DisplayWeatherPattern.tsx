export const displayWeatherPattern = (weatherData: {
  current_weather: { weathercode: number };
}) => {
  switch (weatherData.current_weather.weathercode) {
    case 0:
      return "晴天";
    case 1:
    case 2:
    case 3:
      return "曇り";
    case 45:
    case 61:
    case 63:
    case 65:
    case 66:
    case 67:
      return "雨";
    case 80:
    case 81:
    case 82:
      return "にわか雨";
    case 71:
    case 73:
    case 75:
    case 77:
    case 85:
    case 86:
      return "雪";
    default:
      return "自分で外見ろ";
  }
};
