import React, { useState } from "react";
import Comments from "../../../components/Comments/Comments";

interface SlugProps {
  id: number;
  display: string;
  date: string;
  content: string;
  comments: any;
}

const Slug: React.FC<SlugProps> = ({
  id,
  display,
  date,
  content,
  comments,
}) => {
  const [replies, setReplies] = useState(false);

  return (
    <div className="mx-auto max-w-[70rem] mt-4 p-4 border rounded-lg mb-4 bg-white flex">
      <div className="rounded-full bg-black w-24 h-8 mr-2"></div>
      <div className="flex flex-col ml-2">
        <h3 className="text-xl font-bold mb-2">{display}</h3>
        <div>
          <p className="text-base border-b-2 border-gray-400">{content}</p>
        </div>
        <div className="flex justify-between">
          <button className="mt-2 bg-gray-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded">
            Replies
          </button>
          <span className="text-gray-700 text-sm">{date}</span>
        </div>
      </div>
      {/* <Comments comments={comments} /> */}
      {/* Pass comments data to Comments component */}
    </div>
  );
};

export default Slug;
