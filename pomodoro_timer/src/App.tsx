import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [time, setTime] = useState<number>(25 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [intervalId, setIntervalId] = useState<number | null>(null);
  const [isWork, setIsWork] = useState<boolean>(true);

  useEffect(() => {
    if (isRunning) {
      const id = window.setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
      setIntervalId(id);
    } else {
      if (intervalId) {
        window.clearInterval(intervalId);
      }
    }
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsWork(!isWork);
    setTime(isWork ? 5 * 60 : 25 * 60);
  };

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  if (minutes === 0 && seconds === 0) {
    handleReset();
    handleStart();
  }

  return (
    <>
      <h1>
        {minutes}:{seconds > 9 ? seconds : `0${seconds}`}
      </h1>
      <button onClick={handleStart}>start</button>
      <button onClick={handleStop}>stop</button>
      <button onClick={handleReset}>reset</button>
    </>
  );
}

export default App;
