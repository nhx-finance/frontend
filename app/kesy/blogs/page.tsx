import Blogs from "@/components/kesy/blogs";
import Footer from "@/components/kesy/footer";
import Navbar from "@/components/kesy/navbar";
import React from "react";

function BlogsPage() {
  return (
    <div className="mx-auto max-w-7xl my-0 px-2 md:px-0">
      <Navbar />
      <Blogs />
      <div className="mt-20" />
      <Footer />
    </div>
  );
}

export default BlogsPage;
