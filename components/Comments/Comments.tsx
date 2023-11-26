import React, { useState } from "react";
import { debounce } from "../../src/utils/utils";
import Comment from "../Comment/Comment";
interface comments {
  setblogData: any;
  comments: any;
}
export default function Comments({ setblogData, comments }:{setblogData?:any,comments?:any}) {
  const [commentInput, setCommentInput] = useState("");
  function addReply(commentId: any, replyText: any) {
    const commentsWithNewReply = [...comments];
    insertComment(commentsWithNewReply, commentId, replyText);
    console.log(setblogData);
    
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
            // addReply(comment.id, replyText);
            insertComment(commentInput,comments,commentInput);
            setCommentInput("");
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer mt-2"
        >
          Submit
        </button>
      </div>
      <div>
        {comments.map((comment:any) => (
          <Comment key={comment.id} comment={comment} addReply={addReply} />
        ))}
      </div>
    </div>
  );
}
