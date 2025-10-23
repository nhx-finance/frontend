"use client";
import { blogs } from "@/mocks/blogs";
import React from "react";
import Image from "next/image";
import { IconBrandTwitter } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Blogs() {
  const router = useRouter();
  const handleReadMore = (id: number) => {
    router.push(`/kesy/blogs/${id}`);
  };
  return (
    <div className="mt-20">
      <h1 className="text-2xl font-semibold text-center font-funnel-display">
        Latest Blogs
      </h1>
      <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4 mt-4">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="w-full md:w-1/3 h-[400px] mt-4 md:mt-0"
            onClick={() => handleReadMore(blog.id)}
          >
            <Image
              src={blog.image}
              alt={blog.title}
              width={300}
              height={300}
              className="w-full h-2/3 object-cover rounded-3xl"
            />
            <div className="mt-2">
              <Link
                href={`https://x.com/${blog.author}`}
                className="flex items-center my-2 gap-1"
              >
                <IconBrandTwitter className="size-4 text-muted-foreground" />
                <p className="text-sm font-semibold text-muted-foreground font-medieval-sharp">
                  {blog.author}
                </p>
              </Link>
              <h1 className="text-lg font-semibold font-funnel-display my-4">
                {blog.title}
              </h1>
              <p className="text-sm font-funnel-display text-muted-foreground">
                {blog.date} • {blog.readTime}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blogs;
