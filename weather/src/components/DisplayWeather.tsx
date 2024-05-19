import { DisplayWeatherDataType } from "../types/DisplayWeatherDataType";

type Props = {
  data: DisplayWeatherDataType;
  i: number;
  displayLocation: string;
};

export const DisplayWeather = ({ data, i, displayLocation }: Props) => {
  return (
    <>
      {i === 0 && (
        <>
          <h2>{displayLocation}</h2>
          <h3>今日の天気</h3>
        </>
      )}
      {i === 1 && <h3>週間天気予報</h3>}
      <hr />
      <p>{data.weeklyWeatherDateTime}</p>
      <p>{`天気: ${data.weatherString}`}</p>
      <p>{`最高気温: ${data.temperature2mMax} °C`}</p>
      <p>{`最低気温: ${data.temperature2mMin} °C`}</p>
      <p>{`降水確率: ${data.precipitationProbabilityMean} %`}</p>
    </>
  );
};
