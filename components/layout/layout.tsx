import { useState } from "react";
import Blog from "../Blog/Blog";
import useBlogData from "../../src/utils/blogdata";

export interface AccountType {
  address?: string;
  balance?: string;
  chainId?: string;
  network?: string;
}

const Layout = () => {
  const { blogData, setblogData } = useBlogData();
  const [replies, setReplies] = useState(false);


  return (
    <div>
      <div>
        <div>
          {blogData.map((blog) => (
            <Blog
              key={blog.id}
              replies={replies}
              setReplies={setReplies}
              blogData={blogData}
              setblogData={setblogData}
              {...blog}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Layout;
