'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { GoalCard } from "./goal-card";
import { getActiveGoals } from "@/lib/goals/action";
import { useEffect } from "react";

const goalHistory = [
  {
    id: 1,
    targetHours: 5,
    achieved: true,
    dateSet: "2024-10-05",
    dateAchieved: "2024-10-05",
    progress: 100 // percentage of progress
  },
  {
    id: 2,
    targetHours: 3,
    achieved: false,
    dateSet: "2024-09-30",
    dateAchieved: null,
    progress: 75
  },
  {
    id: 3,
    targetHours: 12,
    achieved: true,
    dateSet: "2024-09-01",
    dateAchieved: "2024-09-28",
    progress: 100
  },
  {
    id: 4,
    targetHours: 6,
    achieved: false,
    dateSet: "2024-10-10",
    dateAchieved: null,
    progress: 40
  },
  {
    id: 5,
    targetHours: 5,
    achieved: true,
    dateSet: "2024-09-23",
    dateAchieved: "2024-09-29",
    progress: 100
  }
];

export default function GoalHistory() {

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Goal History</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col gap-4">
          {goalHistory.map((goal) => (
            <GoalCard key={goal.id} {...goal} />
          ))}
        </ul>
      </CardContent>
      {/* <CardFooter className="flex justify-between">
       
      </CardFooter> */}
    </Card>
  );
}
