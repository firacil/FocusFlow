"use client";

import React, { useEffect, useRef, useState } from "react";
import { ProgressCircle } from "../ui/progress-circle";
import { Button } from "../ui/button";
import { Pause, Play } from "lucide-react";
import { useTimer } from "@/lib/useTimer";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";


interface TimerProps {
  startingTime: number; // in minutes
  sessionType: string;
}

const Timer: React.FC<TimerProps> = ({ startingTime, sessionType }) => {
  const { formatTime, playTimer, pauseTimer, isRunning, timeLeft, totalTime, startTimer, setTimer, endTimer, loadTimer } = useTimer();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
const { toast } = useToast();

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimer(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 || !isRunning) {
      clearInterval(timerRef.current!);
      pauseTimer();
    }
    if(timeLeft === 0 && totalTime !== 0) {
      toast({
        title: "Timer Ended",
      })
    }
    return () => clearInterval(timerRef.current!);
  }, [isRunning, timeLeft]);

  useEffect(() => {
    loadTimer();
  }, [])

  function playBeepAlarm() {
    const alarmSound = new Audio('/beep.mp3');
  alarmSound.play();
  }
  
  return (
    <div className="flex items-center gap-10">
      <ProgressCircle value={timeLeft/totalTime * 100} className="lg:w-[10rem] lg:h-[10rem] w-[8rem] h-[8rem]">
        <span className="text-xl font-medium text-gray-900 dark:text-gray-50">
          {formatTime(timeLeft)}
        </span>
      </ProgressCircle>
      <div>
        <p className="text-sm font-medium text-gray-900 dark:text-gray-50">
          <Button
            variant="outline"
            onClick={pauseTimer}
            disabled={!isRunning}
            className={`${isRunning ? "" : "hidden"}`}
          >
            <Pause />
          </Button>
          <Button
            variant="outline"
            onClick={playTimer}
            disabled={isRunning}
            className={`${isRunning ? "hidden" : ""}`}
          >
            <Play />
          </Button>
        </p>
      </div>
    </div>
  );
};

export default Timer;
