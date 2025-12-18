import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  connected: boolean;
  className?: string;
}

export const StatusBadge = ({ connected, className }: StatusBadgeProps) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn(
        "w-2 h-2 rounded-full",
        connected ? "bg-green-500 animate-pulse" : "bg-muted-foreground"
      )} />
      <span className="text-sm text-muted-foreground font-mono">
        {connected ? "Connected" : "Not Connected"}
      </span>
    </div>
  );
};
