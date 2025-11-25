"use client";
import { useParams } from "next/navigation";
import React from "react";

function BlogDetailsPage() {
  const { id } = useParams();
  return (
    <div>
      <h1>Blog Details {id}</h1>
    </div>
  );
}

export default BlogDetailsPage;
