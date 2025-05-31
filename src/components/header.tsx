import { Bell, Settings, User } from "lucide-react";
import { Button } from "./ui/shadcn/button";

export function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-freee-gray-200 bg-white px-6 shadow-freee">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-freee-blue-500 flex items-center justify-center">
          <span className="text-white font-bold text-sm">TODOアイコン</span>
        </div>
        <h1 className="text-xl font-bold text-freee-gray-800">
          奨学金返済ダッシュボード
        </h1>
      </div>
      <div className="ml-auto flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          className="text-freee-gray-600 hover:text-freee-blue-600"
        >
          <Bell className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-freee-gray-600 hover:text-freee-blue-600"
        >
          <Settings className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-freee-gray-600 hover:text-freee-blue-600"
        >
          <User className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}
