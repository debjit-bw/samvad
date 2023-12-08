import React, { useState } from "react";
import Comments from "../Comments/Comments";
import { useRouter } from "next/router";
import styles from "./blog.module.css";
import { faker } from "@faker-js/faker";
import { Avatar } from "@mui/material";
import { Button } from "@cred/neopop-web/lib/components";
import { Typography } from "@cred/neopop-web/lib/components";
import { colorPalette, FontVariant } from "@cred/neopop-web/lib/primitives";

interface BlogProps {
  id: number;
  heading: string;
  replies: any;
  date: string;
  url: string;
  text: string;
  blogData: any;
  isSlug: boolean;
}

const Blog: React.FC<BlogProps> = ({
  id,
  heading,
  url,
  date,
  text,
  replies,
  blogData,
  isSlug,
}) => {
  const [showReplies, setShowReplies] = useState(false);
  const router = useRouter();
  const handleToggleReplies = () => {
    setShowReplies(!showReplies);
  };

  const handleClick = (id: any) => {
    router.push(`/blog/${id}`);
  };

  const random = faker.image.avatar();

  return (
    <div className={styles.container} onClick={() => handleClick(id)}>
      <div className={styles.subContainer}>
        <Avatar alt="Avatar" src={random} sx={{ height: 40, width: 40 }} />
        {isSlug && (
          <a
            target="_blank"
            href={url}
            className="ml-4 text-gray-800 hover:underline"
          >
            <Typography
              {...FontVariant.HeadingBold20}
              color={colorPalette.popBlack[500]}
              style={{ fontSize: "22px" }}
            >
              {heading}
            </Typography>
          </a>
        )}
        {!isSlug && (
          <a target="_blank" className="ml-4 text-gray-800 hover:underline">
            <Typography
              {...FontVariant.HeadingBold20}
              color={colorPalette.popWhite[500]}
              style={{ fontSize: "22px" }}
            >
              {heading}
            </Typography>
          </a>
        )}
      </div>

      <div className="mb-2">
        <Typography
          {...FontVariant.HeadingRegular22}
          color={colorPalette.popWhite[500]}
          style={{ fontSize: "18px" }}
        >
          {/* {text} */}
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi
          officiis magnam veniam optio voluptatibus animi quos enim similique
          odit deserunt!
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi
          officiis magnam veniam optio voluptatibus animi quos enim similique
          odit deserunt!
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi
          officiis magnam veniam optio voluptatibus animi quos enim similique
          odit deserunt!
        </Typography>
      </div>

      <div className="flex justify-between items-center w-full">
        {!isSlug && (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded focus:outline-none mb-2"
            onClick={handleToggleReplies}
          >
            {showReplies ? "Hide Replies" : "Show Replies"}
          </button>
        )}

        <span className="text-gray-700 text-sm self-end">{date}</span>
      </div>

      {showReplies && (
        <div className="mt-4">
          <Comments replies={replies} postId={id} />
        </div>
      )}
    </div>
  );
};

export default Blog;
