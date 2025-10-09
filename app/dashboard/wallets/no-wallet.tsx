"use client";
import React from "react";
import { useLottie } from "lottie-react";
import animationData from "@/public/wallet.json";

const NoWallet = () => {
  const options = {
    animationData: animationData,
    loop: true,
  };

  const { View } = useLottie(options);

  return <>{View}</>;
};

export default NoWallet;
