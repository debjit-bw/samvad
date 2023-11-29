import React, { useState } from "react";
import Comments from "../Comments/Comments";

interface BlogProps {
  id: number;
  heading: string;
  replies:any;
  date: string;
  text: string;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  blogData: any;
}

const Blog: React.FC<BlogProps> = ({
  id,
  heading,
  date,
  text,
  show,
  setShow,
  replies,
  blogData,
}) => {
  return (
    <div className="mx-auto max-w-[70rem] mt-4 p-4 border rounded-lg mb-4 bg-gradient-to-r from-blue-200 via-blue-100 to-white flex flex-col items-start">
      <div className="flex items-center mb-2">
        <div className="rounded-full bg-black w-10 h-12 inline-block"></div>
        <a href={`/blog/${id}`} className="ml-4">
          <h3 className="text-xl font-bold mb-2 hover:underline text-gray-800">
            {heading}
          </h3>
        </a>
      </div>

      <div className="mb-2">
        <p className="text-base border-b-2 border-gray-400 text-gray-700">
          {text}
        </p>
      </div>

      <div className="flex justify-between items-center w-full">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded focus:outline-none mb-2"
          onClick={() => {
            setShow(!show);
          }}
        >
          {show ? "Hide Replies" : "Show Replies"}
        </button>
        <span className="text-gray-700 text-sm self-end">{date}</span>
      </div>

      {show && (
        <div className="mt-4">
          <Comments  replies={replies} />
        </div>
      )}
    </div>
  );
};

export default Blog;
