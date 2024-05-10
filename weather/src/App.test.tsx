import { fetchWeatherData } from "./App";

describe("Weather App test", () => {
  describe("fetchWeatherData test", () => {
    test("apiを叩くと現在地の天気予報が取得できる", async () => {
      const mockWeatherData = {
        temperature: 25,
        description: "Sunny",
      };
      jest.mock("./App", () => ({
        __esModule: true,
        default: {
          fetchWeatherData: jest.fn(() => Promise.resolve(mockWeatherData)),
        },
      }));

      const result = await fetchWeatherData(0, 0);

      expect(result).toEqual(mockWeatherData);
    });
  });
});
