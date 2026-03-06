"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedNumberProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const SPINS = 3; // Number of full 0-9 loops before landing

function Digit({
  digit,
  duration,
  delay,
}: {
  digit: number;
  duration: number;
  delay: number;
}) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setActive(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    setActive(true);
  }, [digit]);

  // Total slots: SPINS full loops (0-9 each) + final digit position
  const totalSlots = SPINS * 10 + digit;

  return (
    <span
      className="inline-block overflow-hidden"
      style={{ height: "1em", lineHeight: "1em" }}
    >
      <span
        className="inline-flex flex-col"
        style={{
          transform: active ? `translateY(-${totalSlots}em)` : "translateY(0)",
          transition: `transform ${duration}s cubic-bezier(0.12, 0.8, 0.2, 1) ${delay}s`,
          willChange: "transform",
        }}
      >
        {/* Repeat 0-9 SPINS times, then one final 0-9 set to land on */}
        {Array.from({ length: SPINS + 1 }, (_, loopIdx) =>
          DIGITS.map((d) => (
            <span
              key={`${loopIdx}-${d}`}
              className="inline-block text-center"
              style={{ height: "1em", lineHeight: "1em" }}
            >
              {d}
            </span>
          )),
        )}
      </span>
    </span>
  );
}

export function AnimatedNumber({
  value,
  suffix = "",
  prefix = "",
  duration = 1.2,
  className = "",
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const digits = String(Math.abs(Math.round(value))).split("");
  const isNegative = value < 0;

  return (
    <span ref={ref} className={`inline-flex items-baseline ${className}`}>
      {prefix}
      {isNegative && "-"}
      {isVisible
        ? digits.map((d, i) => (
            <Digit
              key={`${i}-${d}`}
              digit={parseInt(d)}
              duration={duration}
              delay={0}
            />
          ))
        : digits.map((_, i) => (
            <span
              key={i}
              className="inline-block overflow-hidden"
              style={{ height: "1em", lineHeight: "1em", width: "0.6em" }}
            >
              0
            </span>
          ))}
      {suffix}
    </span>
  );
}
