import { CalendarIcon } from "lucide-react";

interface DateWithIconProps {
  date?: string | null;
  placeholder?: string;
  className?: string;
}

export function DateWithIcon({
  date,
  placeholder = "-",
  className
}: DateWithIconProps) {
  return (
    <div className={`flex items-center gap-2 ${className || ""}`}>
      <CalendarIcon className="h-4 w-4 text-gray-500" />
      <span className="text-gray-800">
        {date || placeholder}
      </span>
    </div>
  );
}