import React from "react";

interface BlogProps {
  id: number;
  display: string;
  date: string;
  content: string;
}

const Blog: React.FC<BlogProps> = ({ id, display, date, content }) => {
  return (
    <div
      key={id}
      className="mx-auto max-w-lg mt-4 p-4 border rounded-lg mb-4 bg-white flex"
    >
      <div className="rounded-full bg-black w-24 h-8 mr-2"></div>

      <div className="flex flex-col ml-2">
        <h3 className="text-xl font-bold mb-2">{display}</h3>
        <div className="">
          <p className="text-base">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default Blog;
