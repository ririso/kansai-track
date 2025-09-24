import { Card, CardContent } from "@/components/ui/shadcn/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatisticCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconColor: 'blue' | 'green' | 'orange' | 'red';
  valueColor?: string;
  subtitle?: string;
  className?: string;
}

const iconColorClasses = {
  blue: "bg-blue-100 text-blue-600",
  green: "bg-green-100 text-green-600",
  orange: "bg-orange-100 text-orange-600",
  red: "bg-red-100 text-red-600"
};

const defaultValueColors = {
  blue: "text-gray-900",
  green: "text-green-600",
  orange: "text-orange-600",
  red: "text-red-600"
};

export function StatisticCard({
  title,
  value,
  icon: Icon,
  iconColor,
  valueColor,
  subtitle,
  className
}: StatisticCardProps) {
  const finalValueColor = valueColor || defaultValueColors[iconColor];

  return (
    <Card className={cn("border-0 card-hover animate-fade-in bg-white", className)}>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">
              {title}
            </p>
            <p className={cn("text-2xl font-bold", finalValueColor)}>
              {value}
            </p>
            {subtitle && (
              <p className="text-xs text-gray-500 mt-1">
                {subtitle}
              </p>
            )}
          </div>
          <div className={cn(
            "h-12 w-12 rounded-full flex items-center justify-center",
            iconColorClasses[iconColor]
          )}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}