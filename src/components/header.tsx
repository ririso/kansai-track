import { Settings } from "lucide-react";
import { Button } from "./ui/shadcn/button";

export function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
      <h1 className="text-xl font-semibold">奨学金返済ダッシュボード</h1>
      <div className="ml-auto flex items-center gap-4">
        <Button variant="outline" size="sm">
          <Settings className="mr-2 h-4 w-4" />
          設定
        </Button>
      </div>
    </header>
  );
}
