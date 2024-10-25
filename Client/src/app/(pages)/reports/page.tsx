import Link from "next/link";

import PlaceholderContent from "@/components/demo/placeholder-content";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { ProductivityOverview } from "@/components/charts/productivity-overview";
import { WeeklyProductivity } from "@/components/charts/weekly-productivity";
import { MonthlyProductivity } from "@/components/charts/monthly-productivity";

export default function ReportsPage() {
  return (
    <ContentLayout title="Reports">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Reports</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="pt-5 flex flex-col gap-5">
        <ProductivityOverview />
          <WeeklyProductivity />
          <MonthlyProductivity />
        {/* <div className="grid lg:grid-cols-2 gap-5">
        </div> */}
      </div>
    </ContentLayout>
  );
}
