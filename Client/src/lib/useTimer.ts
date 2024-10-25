import { create } from "zustand";
import { currentTimerSession, endTimerSession, pauseTimerSession } from "./timer/action";

interface TimerState {
  timeLeft: number;
  totalTime: number;
  isRunning: boolean;
  sessionType: string;
  startTimer: (time: number, type: string) => void;
  setTimer: (time: number) => void;
  pauseTimer: () => void;
  playTimer: () => void;
  formatTime: (seconds: number) => string;
  endTimer: () => void;
  loadTimer: () => void;
}

export const useTimer = create<TimerState>((set) => ({
  timeLeft: 0,
  isRunning: false,
  totalTime: 0,
  sessionType: "",
  loadTimer: async () => {
    const session = await currentTimerSession();
    if (session) {
      console.log(session);
      localStorage.setItem("timerSession", JSON.stringify(session));
      set({
        timeLeft: session.remainingTime * 60,
        totalTime: session.remainingTime * 60,
        isRunning: true,
        sessionType: session.sessionType
      });
    }
    else{

      const timerSession = localStorage.getItem("timerSession");
      const timerSessionData = timerSession ? JSON.parse(timerSession) : null;
      if(timerSessionData) {
        console.log(timerSessionData);
        set({
          timeLeft: timerSessionData.timeLeft,
          totalTime: timerSessionData.totalTime,
          isRunning: timerSessionData.isRunning,
          sessionType: timerSessionData.sessionType
        });
      }
    }
  },
  startTimer: (time, type) => {
    set({
      timeLeft: time * 60,
      totalTime: time * 60,
      isRunning: true,
      sessionType: type
    });
  },
  setTimer: (time) => {
    set({ timeLeft: time });
  },
  pauseTimer: async () => {
    set({ isRunning: false });
    // try {
    //   const sessionData = await pauseTimerSession();
    //   console.log("Session paused:", sessionData);
    // } catch (error) {
    //   console.error(error?.message);
    // }
  },
  playTimer: () => {
    set({ isRunning: true });
  },
  formatTime: (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  },
  endTimer: async () => {
    await endTimerSession();
    set({ timeLeft: 0, isRunning: false });
  }
}));
