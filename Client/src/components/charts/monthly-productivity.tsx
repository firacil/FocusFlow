"use client";

import { DonutChart } from "@/components/ui/donut-chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
const data = [
  {
    name: "Work Time",
    amount: 4890
  },
  {
    name: "Break Time",
    amount: 2103
  },
  {
    name: "Unrecognized",
    amount: 2103
  },
  
];

export const MonthlyProductivity = () => (
  <Card className="">
    <CardHeader>
      <CardTitle>Monthly Report</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex flex-col gap-12">
        <div className="flex flex-col items-center justify-center gap-4 h-96">
          <DonutChart
            data={data}
            className="w-96 h-96"
            variant="pie"
            category="name"
            value="amount"
            valueFormatter={(number: number) => {
                const hours = Math.floor(number / 60); // Get the number of full hours
                const minutes = number % 60; // Get the remaining minutes
                return `${hours}h ${minutes}m`; // Format as hours and minutes
              }}
          />
        </div>
      </div>
    </CardContent>
    {/* <CardFooter className="flex justify-between">
   
  </CardFooter> */}
  </Card>
);
