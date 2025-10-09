"use client";
import React from "react";
import { useLottie } from "lottie-react";
import animationData from "@/public/kyc.json";

const NoVerification = () => {
  const options = {
    animationData: animationData,
    loop: true,
  };

  const { View } = useLottie(options);

  return <div className="w-full md:w-1/3 h-full">{View}</div>;
};

export default NoVerification;
