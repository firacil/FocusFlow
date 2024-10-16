import { ProgressBar } from "../ui/progress-bar"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
  } from "@/components/ui/card";

export const GoalProgress = () => {
  return (
      <Card className="">
    <CardHeader>
        <CardTitle>Daily Goal</CardTitle>
      </CardHeader>
    <CardContent>
        <div className="flex flex-col gap-10">
            <div>
        <CardDescription>Work session</CardDescription>
          <ProgressBar value={75} label="75%" />

            </div>
            <div>
        <CardDescription>Break session</CardDescription>
          <ProgressBar value={20} label="20%" variant="warning"/>

            </div>
        </div>
      
    </CardContent>
    {/* <CardFooter className="flex justify-between">
     
    </CardFooter> */}
  </Card>
  )
}