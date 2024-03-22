import React, { useEffect, useState } from "react";
import "./_comments.scss";
import SingleComment from "../singleComment/SingleComment";
import { useDispatch, useSelector } from "react-redux";
import {
  addComment,
  getCommentOFVideosById,
} from "../../redux/actions/comments.actions";

const Comments = ({ videoId }) => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.commentsList.comments);
  const _comments = comments?.map(
    (comment) => comment.snippet.topLevelComment.snippet
  );
  useEffect(() => {
    dispatch(getCommentOFVideosById(videoId));
  }, [videoId, dispatch]);
  const handleComments = (e) => {
    e.preventDefault();
    if (text.length === 0) return;
    dispatch(addComment(videoId, text));
    setText("");
  };
  return (
    <div className="comments">
      <p>1223 Comment</p>
      <div className="comments_form d-flex w-100 my-2">
        <img
          src="https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"
          alt="avatar"
          className="rounded-circle mr-3"
        />
        <form onSubmit={handleComments} className="d-flex flex-grow-1">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write a comment..."
            className="flex-grow-1"
          />
          <button className="border-0 p-2">Comment</button>
        </form>
      </div>

      <div className="comments_list">
        {_comments?.map((comment, index) => {
          return <SingleComment key={index} comment={comment} />;
        })}
      </div>
    </div>
  );
};

export default Comments;
