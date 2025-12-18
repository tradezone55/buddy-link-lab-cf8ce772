import { cn } from "@/lib/utils";

interface NetworkNodeProps {
  className?: string;
  delay?: number;
}

export const NetworkNode = ({ className, delay = 0 }: NetworkNodeProps) => {
  return (
    <div 
      className={cn(
        "absolute w-3 h-3 rounded-full bg-primary/30 animate-pulse-glow",
        className
      )}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="absolute inset-0 rounded-full bg-primary/50 blur-sm" />
    </div>
  );
};
