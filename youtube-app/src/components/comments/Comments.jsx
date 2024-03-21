import React from "react";
import "./_comments.scss";
import SingleComment from "../singleComment/SingleComment";

const Comments = () => {
  const handleComments = (e) => {
    e.preventDefault();
    console.log("comments clicked");
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
            placeholder="Write a comment..."
            className="flex-grow-1"
          />
          <button className="border-0 p-2">Comment</button>
        </form>
      </div>

      <div className="comments_list">
        {[...Array(15)].map(() => (
          <SingleComment />
        ))}
      </div>
    </div>
  );
};

export default Comments;
