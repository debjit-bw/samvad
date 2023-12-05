import { useEffect, useState } from "react";
import Blog from "../Blog/Blog";
import { createReply, getAllPosts } from "@/utils/transition";
import { ethers } from "ethers";
import useConnection from "@/utils/connection";

export interface AccountType {
  address?: string;
  balance?: string;
  chainId?: string;
  network?: string;
}

const Layout = () => {
  const [blogData, setblogData]: any = useState([]);
  const [show, setShow] = useState(false);
  const { signer } = useConnection();

  // Define the useEffect hook
  useEffect(() => {
    // Create a function to fetch and set data
    const fetchData = async () => {
      try {
        const posts = await getAllPosts();
        setblogData(posts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the fetchData function
    if (blogData.length === 0) {
      fetchData();
    }
  }, [blogData]);
  return (
    <div>
      <div>
        <div>
          {/* <h1
            onClick={() => {
              try {
                const did = createReply(
                  0,
                  1,
                  "test reply from layout",
                  true,
                  1000000000000000000,
                  signer!
                );
                console.log("did it", did);
              } catch (error) {
                console.log("could not");
              }
            }}
          >
            add
          </h1> */}
          {blogData.map((blog: any) => (
            <Blog
              key={blog.id}
              show={show}
              setShow={setShow}
              blogData={blogData}
              isSlug={false}
              {...blog}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Layout;
