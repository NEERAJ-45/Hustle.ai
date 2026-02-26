"use client"

import { useCounterAnimation } from "@/hooks/use-counter-animation"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

interface AnimatedNumberProps {
  value: number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
}

export function AnimatedNumber({
  value,
  suffix = "",
  prefix = "",
  duration = 2000,
  className = "",
}: AnimatedNumberProps) {
  const { ref, hasBeenVisible } = useIntersectionObserver({ triggerOnce: true })
  const count = useCounterAnimation(value, duration, 0, hasBeenVisible)

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count}
      {suffix}
    </span>
  )
}
