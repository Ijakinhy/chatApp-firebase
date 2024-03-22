import moment from "moment";
import React from "react";
import "./_singleComment.scss";
import { Logger } from "sass";

const SingleComment = ({ comment }) => {
  const { authorDisplayName, textDisplay, authorProfileImageUrl, publishedAt } =
    comment;

  return (
    <div className="comment p-2 d-flex">
      <img
        src={authorProfileImageUrl}
        alt="avatar"
        className="rounded-circle mr-3"
      />
      <div className="comment_body ">
        <p className="comment_header  mb-1 ">
          {authorDisplayName} • {moment(publishedAt).fromNow()}
        </p>
        <p className="mb-0 ">{textDisplay}</p>
      </div>
    </div>
  );
};

export default SingleComment;
