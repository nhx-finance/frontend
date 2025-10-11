"use client";
import { useParams } from "next/navigation";
import React from "react";

function Stock() {
  const { id } = useParams();
  return (
    <div>
      <h1>Stock {id}</h1>
    </div>
  );
}

export default Stock;
