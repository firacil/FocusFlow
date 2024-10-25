"use client";

import { Pause } from "lucide-react";
import { Button } from "../ui/button";
import { ProgressCircle } from "../ui/progress-circle";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import Timer from "./timer";
import { NewTimer } from "./new-timer";
import { useTimer } from "@/lib/useTimer";

export const TimerInfo = () => {
  const { endTimer, sessionType } = useTimer();
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Current session</CardTitle>
        <CardDescription>{sessionType}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-x-10 flex-col lg:flex-row gap-y-10">
          <Timer startingTime={0} sessionType={sessionType}/>
          <div className="flex gap-5">
            <NewTimer>
              <Button variant="outline">New session</Button>
            </NewTimer>
            <Button variant="outline" onClick={() => endTimer()}>
              End session
            </Button>
          </div>
        </div>
      </CardContent>
      {/* <CardFooter className="flex justify-between">
     
    </CardFooter> */}
    </Card>
  );
};
