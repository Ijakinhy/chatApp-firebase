import moment from "moment";
import React from "react";
import "./_singleComment.scss";

const SingleComment = () => {
  return (
    <div className="comment p-2 d-flex">
      <img
        src="https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"
        alt="avatar"
        className="rounded-circle mr-3"
      />
      <div className="comment_body ">
        <p className="comment_header  mb-1 ">
          ijakinhy • {moment("2020-02-02").fromNow()}
        </p>
        <p className="mb-0 ">nice video gweenes</p>
      </div>
    </div>
  );
};

export default SingleComment;
