import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [time, setTime] = useState<number>(25 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [intervalId, setIntervalId] = useState<number | undefined>(undefined);

  const handleStart = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }

    const id = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    setIntervalId(id);
  };

  const handleStop = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(undefined);
    }
  };

  const handleReset = () => {
    handleStop();
    setIsRunning(true);
    setTime(25 * 60);
  };

  useEffect(() => {
    if (time <= 0) {
      handleStop();
      setIsRunning(!isRunning);
      setTime(isRunning ? 5 * 60 : 25 * 60);
      handleStart();
    }
  }, [time, isRunning]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <>
      <h1>
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </h1>
      <button onClick={handleStart}>start</button>
      <button onClick={handleStop}>stop</button>
      <button onClick={handleReset}>reset</button>
    </>
  );
}

export default App;
