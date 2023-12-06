import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Blog from "../../../components/Blog/Blog";
import { getPost, getReply } from "@/utils/transition";
import Comments from "../../../components/Comments/Comments";
import GlobalLayout from "../../../components/Gloabal/Global";

const Slug = (props: any) => {
  const router = useRouter();
  const { slug }: any = router.query;

  // const { blogData, setblogData, getDataByParentId } = useBlogData(); // Get your blog data
  const [post, setPost]: any = React.useState([]);
  const [replies, setReplies] = useState([]);
  console.log("resplies", replies);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const post = await getPost(parseInt(slug));
        setPost(post);
        console.log("inside slug", post.replies);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (post.length === 0) {
      fetchData();
    }
  }, [slug]);

  return (
    <>
      <GlobalLayout props={props}>
        <div style={{ width: "100%",paddingLeft:'20px',paddingRight:'20px' }}>
          <Blog
            key={post.id}
            replies={replies}
            setReplies={setReplies}
            setblogData={setPost}
            isSlug={true}
            {...post}
          />
          <Comments replies={post.replies} />
        </div>
      </GlobalLayout>
    </>
  );
};

export default Slug;
