"use client";

import { BackgroundLines } from "../ui/background-lines";
import { TextGenerateEffect } from "../ui/text-generate-effect";

export const Home = () => {
  const subTitle =
    "Set your work and break intervals, track your progress, and achieve your productivity goals effortlessly. Stay focused, stay productive.";
  return (
    <BackgroundLines className="flex items-center justify-center w-full flex-col px-4 min-h-screen">
      <h2 className=" bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
        Boost Your Productivity,
        <br /> One Timer at a Time
      </h2>
      <div className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
      <TextGenerateEffect words={subTitle} />
      </div>
    </BackgroundLines>
  );
};
