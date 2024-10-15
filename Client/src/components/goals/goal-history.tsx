import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

const goalHistory = [
  {
    id: 1,
    type: "Daily",
    targetHours: 5,
    achieved: true,
    dateSet: "2024-10-05",
    dateAchieved: "2024-10-05",
    progress: 100 // percentage of progress
  },
  {
    id: 2,
    type: "Weekly",
    targetHours: 30,
    achieved: false,
    dateSet: "2024-09-30",
    dateAchieved: null,
    progress: 75
  },
  {
    id: 3,
    type: "Monthly",
    targetHours: 120,
    achieved: true,
    dateSet: "2024-09-01",
    dateAchieved: "2024-09-28",
    progress: 100
  },
  {
    id: 4,
    type: "Daily",
    targetHours: 6,
    achieved: false,
    dateSet: "2024-10-10",
    dateAchieved: null,
    progress: 40
  },
  {
    id: 5,
    type: "Weekly",
    targetHours: 35,
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
        <ul className="goal-history">
          {goalHistory.map((goal) => (
            <li key={goal.id}>
              {goal.type} Goal: {goal.achieved ? "Achieved" : "Missed"}
            </li>
          ))}
        </ul>
      </CardContent>
      {/* <CardFooter className="flex justify-between">
       
      </CardFooter> */}
    </Card>
  );
}
