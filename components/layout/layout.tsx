import { useState, useCallback } from "react";
import { ethers } from "ethers";
import { Header } from "../Header/Header";
import Blog from "../Blog/Blog";
import BlogDiscussion from "../BlogDiscussion.tsx/BlogDiscussion";
import Comments from "../Comments/Comments";

export interface AccountType {
  address?: string;
  balance?: string;
  chainId?: string;
  network?: string;
}

const Layout = () => {
  const [replies, setReplies] = useState(false);
  const [blogData, setblogData] = useState([
    {
      id: 1,
      display: "link1",
      date: "13-09-2023",
      content:
        "In my local language (Bahasa Indonesia) there are no verb-2 or past tense form as time tracker. So, I often forget to use the past form of verb when speaking english. I saw him last night (correct) I see him last night ...",
      comments: [
        {
          id: 1,
          display: "Hey Guys!!",
          children: [
            {
              id: 2,
              display: "Let's Comment",
              children: [],
            },
            {
              id: 3,
              display: "What's Going on",
              children: [],
            },
          ],
        },
      ],
    },
    {
      id: 2,
      display: "link2",
      date: "13-09-2023",
      content:
        "In my local language (Bahasa Indonesia) there are no verb-2 or past tense form as time tracker. So, I often forget to use the past form of verb when speaking english. I saw him last night (correct) I see him last night ...",
      comments: [
        {
          id: 2,
          display: "Hey Guys Second!!",
          children: [
            {
              id: 2,
              display: "Let's Comment",
              children: [],
            },
            {
              id: 3,
              display: "What's Going on",
              children: [],
            },
          ],
        },
      ],
    },
  ]);

  return (
    <div>
      <div>
        <div>
          {blogData.map((blog) => (
            <Blog
              key={blog.id}
              replies={replies}
              setReplies={setReplies}
              setblogData={setblogData}
              {...blog}
            />
          ))}
          {/* {replies && <Comments />} */}
        </div>
      </div>
    </div>
  );
};

export default Layout;
