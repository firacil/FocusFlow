"use client";

import { BarChart } from "@/components/ui/bar-chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

const chartdata = [
  {
    time: "12:00",
    Work: 50,
    Break: 5
  },
  {
    time: "01:00",
    Work: 46,
    Break: 12
  },
  {
    time: "02:00",
    Work: 50,
    Break: 5
  },
  {
    time: "03:00",
    Work: 35,
    Break: 20
  },
  {
    time: "04:00",
    Work: 0,
    Break: 0
  },
  {
    time: "05:00",
    Work: 0,
    Break: 0
  },
  {
    time: "06:00",
    Work: 50,
    Break: 5
  },
  {
    time: "07:00",
    Work: 50,
    Break: 10
  },
  {
    time: "08:00",
    Work: 35,
    Break: 5
  },
  {
    time: "09:00",
    Work: 20,
    Break: 10
  },
  {
    time: "10:00",
    Work: 30,
    Break: 5
  },
  {
    time: "11:00",
    Work: 40,
    Break: 5
  }
];

export const ProductivityOverview = () => (
  <Card className="">
    <CardHeader>
      <CardTitle>Productivity Overview</CardTitle>
    </CardHeader>
    <CardContent>
      <BarChart
        className="h-80"
        data={chartdata}
        index="time"
        categories={["Work", "Break"]}
        // valueFormatter={(number: number) =>
        //   `$${Intl.NumberFormat("us").format(number).toString()}`
        // }
        onValueChange={(v) => console.log(v)}
      />
    </CardContent>
    {/* <CardFooter className="flex justify-between">
     
    </CardFooter> */}
  </Card>
);
