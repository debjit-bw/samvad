import React, { useState } from "react";
import Comments from "../../../components/Comments/Comments";
import useBlogData from "../../utils/blogdata";
import { useRouter } from "next/router";
import Blog from "../../../components/Blog/Blog";

interface SlugProps {
  display: string;
  date: string;
  content: string;
  comments: any;
}

const Slug: React.FC<SlugProps> = ({ display, date, content, comments }) => {
  const router = useRouter();
  const { slug }: any = router.query;

  console.log("hey", slug);
  const [replies, setReplies] = useState(false);
  const { blogData, setblogData, getDataByParentId } = useBlogData(); // Get your blog data
  const [post, setPost]:any = React.useState({});
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("hey1", slug);
        const data2: any = await getDataByParentId(parseInt(slug));
        setPost(data2);
      } catch (error) {
        // Handle errors, e.g., log them or set a default value for post
        console.error("Error fetching data:", error);
        setPost({}); // Set a default value for post in case of error
      }
    };

    if (slug) {
      fetchData();
    }
  }, [slug]);

  console.log("hey", post);

  return (

      <Blog
        key={post.id}
        replies={replies}
        setReplies={setReplies}
        setblogData={setblogData}
        {...post}
      />
 
  );
};

export default Slug;
