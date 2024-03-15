import React from "react";
import "./_videoMetaData.scss";
import numeral from "numeral";
import moment from "moment";
import ShowMoreText from "react-show-more-text";
import { MdThumbUp, MdThumbDown } from "react-icons/md";

const VideoMetaData = () => {
  return (
    <div className="videoMetaData py-2">
      <div className="videoMetaData_top">
        <h5>video title</h5>
        <div className="d-flex justify-content-between align-items-center py-1">
          <span>
            {numeral(10000).format("0.a")} Views •
            {moment("2020-03-03").fromNow()}
          </span>
          <div>
            <span className="mr-3">
              <MdThumbUp size={26} />
              {numeral(10000).format("0.a")}
            </span>
            <span className="mr-3">
              <MdThumbDown size={26} />
              {numeral(10000).format("0.a")}
            </span>
          </div>
        </div>
      </div>

      <div className="videoMetaData_channel d-flex justify-content-between align-items-center my-2 py-3">
        <div className="d-flex">
          <img
            src="https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"
            alt="avatar"
            className="rouder-circle mr-3"
          />
          <div className="d-flex flex-column">
            <span>channel name</span>
            <span>{numeral(10000).format("0.a")} Subscribers</span>
          </div>
        </div>
        <div className="d-flex">
          <button className="btn border-0 p-2 m-3">Subscribe</button>
        </div>
      </div>
      <div className="videoMetaData_description">
        <ShowMoreText
          line={3}
          more="Show More"
          less="Show Less"
          anchorClass="showMoreText"
          expanded={false}
        >
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
          dolores ullam perspiciatis veritatis voluptatibus sapiente cumque
          dolorem, tempore quidem culpa aliquam repudiandae qui vero provident!
          Blanditiis maiores sequi sint quos? Aperiam eos consectetur est sunt,
          voluptatibus in tempore, nam quibusdam, esse nobis at veniam!
          Blanditiis aliquam ea exercitationem cum quaerat. Lorem ipsum dolor
          sit amet, consectetur adipisicing elit. Quidem tempora cumque officiis
          quam, rerum saepe aut earum odit, accusantium aliquid blanditiis sed
          eius a distinctio accusamus cupiditate, quo repudiandae doloremque in
          est. Cumque illum alias, beatae voluptatem minima quam nemo,
          doloremque assumenda ipsum nihil blanditiis corporis quae eum rem
          veritatis temporibus incidunt nisi dignissimos similique amet fuga.
          Hic eius assumenda aspernatur possimus aliquam, sed accusamus itaque
          cum! Hic rerum amet cumque cupiditate sunt saepe suscipit, deleniti
          animi eius perferendis ad autem voluptatem perspiciatis laboriosam at
          fuga. Rem facere distinctio, dolores hic fugit laudantium pariatur id
          cupiditate, natus, quam ad ipsam.
        </ShowMoreText>
      </div>
    </div>
  );
};

export default VideoMetaData;
