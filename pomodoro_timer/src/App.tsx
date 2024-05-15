import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [time, setTime] = useState<number>(2 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [intervalId, setIntervalId] = useState<number | undefined>(undefined);
  const [isWorkTime, setIsWorkTime] = useState<boolean>(true);

  const handleStart = () => {
    if (!isRunning) {
      const id = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);

      setIntervalId(id);
      setIsRunning(true);
    }
  };

  const handleStop = () => {
    if (intervalId && isRunning) {
      clearInterval(intervalId);
      setIntervalId(undefined);
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    handleStop();
    setTime(2 * 60);
  };

  useEffect(() => {
    if (time <= 0) {
      handleStop();
      setIsWorkTime((prevIsWorkTime) => {
        const nextIsWorkTime = !prevIsWorkTime;
        setTime(nextIsWorkTime ? 1 * 60 : 2 * 60);
        return nextIsWorkTime;
      });
      setTimeout(handleStart, 0);
    }
  }, [time]);

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
