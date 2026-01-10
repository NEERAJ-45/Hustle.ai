"use client"

import { useEffect, useState } from "react"

export function useCounterAnimation(end: number, duration = 2000, start = 0, isActive = true) {
  const [count, setCount] = useState(start)

  useEffect(() => {
    if (!isActive) return

    let startTime: number | null = null
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)

      setCount(Math.floor(easeOutQuart * (end - start) + start))

      if (progress < 1) {
        window.requestAnimationFrame(step)
      }
    }

    window.requestAnimationFrame(step)
  }, [end, duration, start, isActive])

  return count
}
