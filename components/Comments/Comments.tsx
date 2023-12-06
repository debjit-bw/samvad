import React, { useState } from "react";
import { debounce } from "../../src/utils/utils";
import Comment from "../Comment/Comment";

export default function Comments({ replies }: { replies: any }) {
  console.log("replies", replies);

  const [commentInput, setCommentInput] = useState("");



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
            // addReply(comment.id, replyText
            setCommentInput("");
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer mt-2"
        >
          Submit
        </button>
      </div>
      <div>
        {replies?.map((reply: any) => (
          <Comment key={reply.id} reply={reply} />
        ))}
      </div>
    </div>
  );
}
