// components/ActivityCard.tsx

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/shadcn/tabs";
import { RecentActivity } from "../bak/recent-activity";

export default function ActivityCard() {
  return (
    <Card className="border-0 shadow-custom animate-fade-in bg-white">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-1">
          <CardTitle>最近のアクティビティ</CardTitle>
          <CardDescription>アカウントの最近の活動</CardDescription>
        </div>
        <div className="ml-auto">
          <Tabs defaultValue="all">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">すべて</TabsTrigger>
              <TabsTrigger value="payments">支払い</TabsTrigger>
              <TabsTrigger value="updates">更新</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <RecentActivity />
      </CardContent>
    </Card>
  );
}
