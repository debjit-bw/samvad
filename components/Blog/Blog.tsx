import React, { useState } from "react";
import Comments from "../Comments/Comments";

interface BlogProps {
  id: number;
  display: string;
  date: string;
  content: string;
  replies: boolean;
  setReplies: React.Dispatch<React.SetStateAction<boolean>>;
  comments: any;
  setblogData: React.Dispatch<React.SetStateAction<any>>;
  blogData: any;
}

const Blog: React.FC<BlogProps> = ({
  id,
  display,
  date,
  content,
  replies,
  setReplies,
  comments,
  setblogData,
  blogData,
}) => {
  return (
    <div className="mx-auto max-w-[70rem] mt-4 p-4 border rounded-lg mb-4 bg-gradient-to-r from-blue-200 via-blue-100 to-white flex flex-col items-start">
      <div className="flex items-center mb-2">
        <div className="rounded-full bg-black w-10 h-12 inline-block"></div>
        <a href={`/blog/${id}`} className="ml-4">
          <h3 className="text-xl font-bold mb-2 hover:underline text-gray-800">
            {display}
          </h3>
        </a>
      </div>

      <div className="mb-2">
        <p className="text-base border-b-2 border-gray-400 text-gray-700">
          {content}
        </p>
      </div>

      <div className="flex justify-between items-center w-full">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded focus:outline-none mb-2"
          onClick={() => {
            setReplies(!replies);
          }}
        >
          {replies ? "Hide Replies" : "Show Replies"}
        </button>
        <span className="text-gray-700 text-sm self-end">{date}</span>
      </div>

      {replies && (
        <div className="mt-4">
          <Comments setblogData={setblogData} comments={comments} />
        </div>
      )}
    </div>
  );
};

export default Blog;
