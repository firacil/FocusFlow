"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { LineChart } from "@/components/ui/line-chart";

const chartdata = [
  {
    date: "Monday",
    Work: 50,
    Break: 5
  },
  {
    date: "Tuesday",
    Work: 46,
    Break: 12
  },
  {
    date: "Wednesday",
    Work: 50,
    Break: 5
  },
  {
    date: "Thursday",
    Work: 35,
    Break: 20
  },
  {
    date: "Friday",
    Work: 0,
    Break: 0
  },
  {
    date: "Saturday",
    Work: 0,
    Break: 0
  },
  {
    date: "Sunday",
    Work: 50,
    Break: 5
  }
];

export const WeeklyProductivity = () => (
  <Card className="">
    <CardHeader>
      <CardTitle>Weekly Report</CardTitle>
    </CardHeader>
    <CardContent>
      <LineChart
        className="h-80"
        data={chartdata}
        index="date"
        categories={["Work", "Break"]}
        onValueChange={(v) => console.log(v)}
      />
    </CardContent>
    {/* <CardFooter className="flex justify-between">
   
  </CardFooter> */}
  </Card>
);
