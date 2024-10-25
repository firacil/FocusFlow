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
import Timer from "../timer/timer";

export const CurrentSessionInfo = () => (
  <Card className="">
    <CardHeader>
      <CardTitle>Current session</CardTitle>
      <CardDescription>Work session</CardDescription>
    </CardHeader>
    <CardContent>
     <Timer startingTime={0} sessionType="work" />
    </CardContent>
    {/* <CardFooter className="flex justify-between">
     
    </CardFooter> */}
  </Card>
);
