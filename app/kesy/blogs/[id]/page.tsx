"use client";
import { useParams } from "next/navigation";
import React from "react";
import Navbar from "@/components/kesy/navbar";
import Link from "next/link";

function BlogDetailsPage() {
  const { id } = useParams();
  return (
    <div className="max-w-7xl mx-auto flex items-center flex-col justify-between">
      <Navbar />
      <p className="text-sm font-funnel-display font-bold text-center mt-10 text-muted-foreground">
        {id}. Blog coming soon
      </p>
      <Link
        href="/kesy/blogs"
        className="text-sm font-funnel-display font-bold text-center mt-10 underline"
      >
        Back to Blogs
      </Link>
    </div>
  );
}

export default BlogDetailsPage;
