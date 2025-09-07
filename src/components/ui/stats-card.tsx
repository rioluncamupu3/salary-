import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: string;
  icon?: ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  variant?: "default" | "success" | "warning";
  className?: string;
}

export function StatsCard({ 
  title, 
  value, 
  icon, 
  trend, 
  variant = "default",
  className 
}: StatsCardProps) {
  const variantStyles = {
    default: "border-border bg-card",
    success: "border-success/20 bg-success-light",
    warning: "border-warning/20 bg-warning-light",
  };

  return (
    <div className={cn(
      "rounded-lg border p-6 shadow-card transition-all duration-200 hover:shadow-elevated animate-scale-in",
      variantStyles[variant],
      className
    )}>
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-card-foreground">{value}</p>
          {trend && (
            <div className={cn(
              "flex items-center text-sm font-medium",
              trend.isPositive ? "text-success" : "text-destructive"
            )}>
              <span className={cn(
                "mr-1",
                trend.isPositive ? "text-success" : "text-destructive"
              )}>
                {trend.isPositive ? "↗" : "↘"}
              </span>
              {trend.value}
            </div>
          )}
        </div>
        {icon && (
          <div className="rounded-full bg-primary/10 p-3 text-primary">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}