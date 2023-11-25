import React, { useState } from "react";
import { debounce } from "../../utils/utils";
import Comment from "../Comment/Comment";

export default function Comments() {
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState([
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
  ]);

  function addReply(commentId: any, replyText: any) {
    const commentsWithNewReply = [...comments];
    insertComment(commentsWithNewReply, commentId, replyText);
    setComments(commentsWithNewReply);
  }

  function newComment(text: string) {
    return {
      id: new Date().getTime(),
      display: text,
      children: [],
    };
  }

  function insertComment(comments: any, parentId: any, text: string) {
    for (let i = 0; i < comments.length; i++) {
      let comment = comments[i];
      if (comment.id === parentId) {
        comment.children.unshift(newComment(text));
      }
    }

    for (let i = 0; i < comments.length; i++) {
      let comment = comments[i];
      insertComment(comment.children, parentId, text);
    }
  }

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
            setComments([newComment(commentInput), ...comments]);
            setCommentInput("");
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer mt-2"
        >
          Submit
        </button>
      </div>
      <div>
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} addReply={addReply} />
        ))}
      </div>
    </div>
  );
}