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

export const CurrentSessionInfo = () => (
  <Card className="">
    <CardHeader>
      <CardTitle>Current session</CardTitle>
      <CardDescription>Work session</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="flex items-center gap-x-10 justify-center">
        <ProgressCircle value={75} className="w-[10rem] h-[10rem]">
          <span className="text-xl font-medium text-gray-900 dark:text-gray-50">
            30:00
          </span>
        </ProgressCircle>
        <div>
          <p className="text-sm font-medium text-gray-900 dark:text-gray-50">
            <Button variant="outline">
              <Pause />
            </Button>
          </p>
        </div>
      </div>
    </CardContent>
    {/* <CardFooter className="flex justify-between">
     
    </CardFooter> */}
  </Card>
);
