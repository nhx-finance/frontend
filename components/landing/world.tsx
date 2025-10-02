"use client";

import animationData from "@/public/globe2.json";
import { useLottie } from "lottie-react";

const WorldAnimation = () => {
  // Create a mutable copy to prevent extension errors
  const mutableAnimationData = JSON.parse(JSON.stringify(animationData));

  const defaultOptions = {
    animationData: mutableAnimationData,
    loop: true,
  };

  const { View } = useLottie(defaultOptions);

  return (
    <>
      <div className=" flex justify-center items-center">
        <div className="w-full md:w-3/4">{View}</div>
      </div>
    </>
  );
};

export default WorldAnimation;
