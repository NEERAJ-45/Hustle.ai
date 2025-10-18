"use client"
import React from 'react'
import SplitText from "../../components/SplitText";


const page = () => {
  const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-black bg-gradient-to-b from-black via-gray-900 to-black px-4 font-[var(--font-inter)]">
      <SplitText
  text="Dashboard"
  className="text-9xl text-white font-semibold text-center"
  delay={100}
  duration={0.6}
  ease="bounce.out"
  splitType="chars"
  from={{ opacity: 0, y: 40 }}
  to={{ opacity: 1, y: 0 }}
  threshold={0.1}
  rootMargin="-100px"
  textAlign="center"
  onLetterAnimationComplete={handleAnimationComplete}
/>
    
    </div>
  )
}

export default page
