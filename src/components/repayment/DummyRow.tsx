import { Badge } from "@/components/ui/shadcn/badge";
import { CalendarIcon } from "lucide-react";

export function DummyRow({ emptyRowCount }: { emptyRowCount: number }) {
  return (
    <>
      {Array.from({ length: emptyRowCount }).map((_, i) => (
        <tr key={`empty-${i}`} className="border-none">
          <td className="p-4 align-middle font-medium">
            <div className="flex items-center gap-2 opacity-0">
              <CalendarIcon className="h-4 w-4 text-gray-500" />
              <span>dummy</span>
            </div>
          </td>
          <td className="p-4 align-middle font-medium">
            <div className="flex items-center gap-2 opacity-0">
              <CalendarIcon className="h-4 w-4 text-gray-500" />
              <span>dummy</span>
            </div>
          </td>
          <td className="p-4 align-middle">
            <span className="font-bold opacity-0">0</span>
          </td>
          <td className="p-4 align-middle">
            <Badge variant="outline" className="border opacity-0">
              dummy
            </Badge>
          </td>
          <td className="p-4 align-middle">
            <span className="opacity-0">dummy</span>
          </td>
          <td className="p-4 align-middle">
            <span className="opacity-0">dummy</span>
          </td>
        </tr>
      ))}
    </>
  );
}
