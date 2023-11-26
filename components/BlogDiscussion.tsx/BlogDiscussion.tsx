// components/BlogDiscussion/BlogDiscussion.tsx
import React from "react";
import Comments from "../Comments/Comments";

interface BlogDiscussionProps {
  id: number;
  display: string;
  date: string;
  content: string;
  getData: () => void
}

const BlogDiscussion: React.FC<BlogDiscussionProps> = ({
  id,
  display,
  date,
  content,
}) => {
  return (
    // <div className="mx-auto max-w-[70rem] mt-4 p-4 border rounded-lg mb-4 bg-white">
    //   <h1 className="text-2xl font-bold mb-4">Discussion</h1>
    //   <div className="text-base">{content}</div>
    //   {/* Add more components and styling as needed */}
    // </div>

    <Comments/>
  );
};

export default BlogDiscussion;
