import { Scale } from "lucide-react"
import { cn } from "@/lib/utils"

interface LogoProps {
  size?: "sm" | "md" | "lg"
  className?: string
  showText?: boolean
}

export function Logo({ size = "md", className, showText = true }: LogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  }

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  }

  const textSizes = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
  }

  return (
    <div className={cn("flex items-center space-x-3", className)}>
      <div
        className={cn(
          "bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg",
          sizeClasses[size],
        )}
      >
        <Scale className={cn("text-black", iconSizes[size])} />
      </div>
      {showText && (
        <span
          className={cn(
            "font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent",
            textSizes[size],
          )}
        >
          LexiPro
        </span>
      )}
    </div>
  )
}
