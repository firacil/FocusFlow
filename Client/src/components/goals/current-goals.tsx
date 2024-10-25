"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { useGoals } from "@/lib/useGoals";
import { useEffect } from "react";

export const CurrentGoals = () => {
  const { workTime, breakTime, loadGoals } = useGoals();
  useEffect(() => {
    loadGoals();
  }, []);
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Current Goal</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-10">
          <div>
            <CardDescription>Work session</CardDescription>
            <div className="text-xl font-bold">{workTime} hour</div>
          </div>
          <div>
            <CardDescription>Break session</CardDescription>
            <div className="text-xl font-bold">{breakTime} hour</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
