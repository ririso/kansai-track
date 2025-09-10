"use client";

import { Link, Receipt } from "lucide-react";
import { Button } from "../ui/shadcn/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/shadcn/card";
import { RepaymentHistory } from "./RepaymentHistory";

export default function RepaymentHistoryArea() {
  return (
    <>
      {/* 支払い履歴 */}
      <Card className="border-0 shadow-custom animate-fade-in bg-white">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-gray-800">支払い履歴</CardTitle>
            <CardDescription className="text-gray-600">
              過去の支払い記録
            </CardDescription>
          </div>
          <Link href="/payments">
            <Button
              variant="outline"
              size="sm"
              className="border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent"
            >
              <Receipt className="h-4 w-4 mr-1" />
              管理
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <RepaymentHistory />
        </CardContent>
      </Card>
    </>
  );
}
