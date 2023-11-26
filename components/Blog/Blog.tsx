import React, { useState } from "react";
import Comments from "../Comments/Comments";

interface BlogProps {
  id: number;
  display: string;
  date: string;
  content: string;
  replies: boolean;
  setReplies: any;
  comments: any;
  setblogData: any;
  blogData:any;
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
  blogData
}) => {
  console.log('kaat',comments)
  return (
    <>
      <div
        key={id}
        className="mx-auto max-w-[70rem] mt-4 p-4 border rounded-lg mb-4 bg-white flex"
      >
        <div className="rounded-full bg-black w-24 h-8 mr-2"></div>

        <div className="flex flex-col ml-2">
          <a href={`/blog/${id}`}>
            <h3 className="text-xl font-bold mb-2">{display}</h3>
          </a>
          <div className="">
            <p className="text-base border-b-2 border-gray-400">{content}</p>
          </div>
          <div className="flex justify-between">
            <button
              className=" mt-2 bg-gray-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
              onClick={() => {
                setReplies(!replies);
                console.log(replies);
              }}
            >
              Replies
            </button>
            <span className="text-gray-700 text-sm">{date}</span>
          </div>
        </div>
      </div>
      {replies && <Comments setblogData={setblogData} comments={comments} />}
    </>
  );
};

export default Blog;
