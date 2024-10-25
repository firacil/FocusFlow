"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { ProgressBar } from "../ui/progress-bar";
import { CircleCheckBig } from "lucide-react";

interface GoalCardProps {
  id: number;
  targetHours: number;
  achieved: boolean;
  dateSet: string;
  dateAchieved: string | null;
  progress: number;
}

export const GoalCard = ({
  id,
  targetHours,
  achieved,
  dateSet,
  dateAchieved,
  progress
}: GoalCardProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>{targetHours} work hours</CardTitle>
          {achieved && <CircleCheckBig className="text-green-500"/>}
        </div>
        <CardDescription>
          <ProgressBar value={progress} label={`${progress}%`} />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          <p>Date set: {dateSet}</p>
          <p className={`${achieved ? "" : "hidden"}`}>
            Date Achieved: {dateAchieved}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
