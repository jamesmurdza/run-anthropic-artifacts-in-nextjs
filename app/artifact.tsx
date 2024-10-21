import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCallback, useEffect, useState } from "react";

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => setTime((time) => time + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);

  const startStop = () => {
    setIsRunning(!isRunning);
  };

  const reset = useCallback(() => {
    setTime(0);
    setIsRunning(false);
    setLaps([]);
  }, []);

  const lap = useCallback(() => {
    setLaps((laps) => [...laps, time]);
  }, [time]);

  const formatTime = (t) => {
    const minutes = Math.floor(t / 6000);
    const seconds = Math.floor((t % 6000) / 100);
    const centiseconds = t % 100;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}.${centiseconds.toString().padStart(2, "0")}`;
  };

  return (
    <Card className="w-80">
      <CardHeader>
        <CardTitle className="text-center">Stopwatch</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold text-center mb-4">
          {formatTime(time)}
        </div>
        <ScrollArea className="h-40 w-full border rounded-md p-2">
          {laps.map((lapTime, index) => (
            <div key={index} className="text-sm">
              Lap {index + 1}: {formatTime(lapTime)}
            </div>
          ))}
        </ScrollArea>
      </CardContent>
      <CardFooter className="justify-center gap-2 flex-wrap">
        <Button onClick={startStop}>{isRunning ? "Stop" : "Start"}</Button>
        <Button onClick={reset}>Reset</Button>
        <Button onClick={lap} disabled={!isRunning}>
          Lap
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Stopwatch;
