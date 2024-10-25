import { create } from "zustand";
import { createGoal, getActiveGoals } from "./goals/action";

interface GoalsState {
  workTime: string;
  breakTime: string;
  setGoals: (work: string, breakTime: string) => void;
  loadGoals: () => void;
}

export const useGoals = create<GoalsState>((set) => ({
  workTime: "0",
  breakTime: "0",
  setGoals: async (work, breakTime) => {
    await createGoal("daily", Number(work));
    set({ workTime: work, breakTime: breakTime });
  },
  loadGoals: async () => {
    const goals = await getActiveGoals() as { goalId: string, goalType: 'daily' | 'weekly' | 'monthly', targetHours: number, progress: number }[];
    if (goals) {
      goals.forEach((goal: any) => {
        if (goal.goalType === "daily") {
          set({ workTime: goal.targetHours });     
      }});
    }
  }
}));
