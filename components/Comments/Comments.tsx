import React, { useState } from "react";
import { debounce } from "../../src/utils/utils";
import Comment from "../Comment/Comment";
import { createReply } from "@/utils/transition";
import useConnection from "@/utils/connection";

export default function Comments({
  replies,
  postId,
}: {
  replies: any;
  postId: number;
}) {
  const { signer } = useConnection();
  console.log("replies", replies);

  const [commentInput, setCommentInput] = useState("");

  const onSubmit = async () => {
    try {
      await createReply(
        postId,
        1,
        commentInput,
        true,
        "10000000000000000",
        signer!
      );
    } catch (error) {
      console.log("failed");
      console.log(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <div className="comment-input-box">
        <textarea
          rows={4}
          cols={50}
          className="border border-gray-300 rounded p-2"
          value={commentInput}
          onChange={(e) => {
            debounce(setCommentInput(e.target.value));
          }}
        />
        <br />
        <button
          onClick={() => {
            setCommentInput("");
            onSubmit();
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer mt-2"
        >
          Submit
        </button>
      </div>
      <div>
        {replies?.map((reply: any) => (
          <Comment key={reply.id} reply={reply} postId={postId} />
        ))}
      </div>
    </div>
  );
}
