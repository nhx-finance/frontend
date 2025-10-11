"use client";
import { useParams } from "next/navigation";
import React from "react";

function Asset() {
  const { id } = useParams();
  return (
    <div>
      <h1>Asset {id}</h1>
    </div>
  );
}

export default Asset;
