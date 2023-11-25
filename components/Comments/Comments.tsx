import React, { useState } from "react";
import { debounce } from "../../utils/utils";
import Comment from "../Comment/Comment";

export default function Comments() {
  let [commentInput, setCommentInput] = useState("");
  let [comments, setComments] = useState([
    {
      id: 1,
      display: "Hey Guys !! ",
      children: [
        {
          id: 2,
          display: "Lets Comment",
          children: []
        },
        {
          id: 3,
          display: "Whats Going on ",
          children: []
        }
      ]
    },
    {
      id: 2,
      display: "Hey Guys Second !! ",
      children: [
        {
          id: 2,
          display: "Lets Comment",
          children: []
        },
        {
          id: 3,
          display: "Whats Going on ",
          children: []
        }
      ]
    }
  ]);

  function addReply(commentId:any, replyText:any) {
    let commentsWithNewReply = [...comments];
    insertComment(commentsWithNewReply, commentId, replyText);
    setComments(commentsWithNewReply);
  }

  function newComment(text:any) {
    return {
      id: new Date().getTime(),
      display: text,
      children: []
    };
  }

  function insertComment(comments:any, parentId:any, text:any) {
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
    <>
      <div className="comment-input-box">
        <textarea
          rows="4"
          cols="50"
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
        >
          Submit
        </button>
      </div>
      <div>
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} addReply={addReply} />
        ))}
      </div>
    </>
  );
}
