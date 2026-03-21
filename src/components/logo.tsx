import { cn } from "@/lib/utils";
import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function Logo({ size = "md", className }: LogoProps) {
  const sizeClasses = {
    sm: "text-xl font-bold",
    md: "text-3xl font-bold",
    lg: "text-4xl font-bold",
    xl: "text-5xl font-bold"
  };

  return (
    <Link href="/" className={cn("inline-block", className)}>
      <div className={cn(sizeClasses[size], "text-gray-900 hover:text-gray-700 transition-colors cursor-pointer")}>
        Mira
      </div>
    </Link>
  );
}
