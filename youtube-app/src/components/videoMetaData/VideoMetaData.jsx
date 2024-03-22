import React, { useEffect } from "react";
import "./_videoMetaData.scss";
import numeral from "numeral";
import moment from "moment";
import ShowMoreText from "react-show-more-text";
import { MdThumbUp, MdThumbDown } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  checkSubscriptionStatus,
  getChannelDetails,
} from "../../redux/actions/channel.action";

const VideoMetaData = ({ videos }) => {
  const { channelId, channelTitle, title, publishedAt, description } =
    videos.items[0].snippet;
  const { viewCount, likeCount, disLikeCount } = videos.items[0].statistics;
  const { channelDetails } = useSelector((state) => state.channelDetails);
  const { snippet, statistics } = useSelector(
    (state) => state.channelDetails.channels
  );
  const subscriptionStatus = useSelector(
    (state) => state.channelDetails.subscriptionStatus
  );
  const accessToken = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getChannelDetails(channelId));
    // dispatch(checkSubscriptionStatus(channelId));f
  }, [dispatch, channelId]);

  return (
    <div className="videoMetaData py-2">
      <div className="videoMetaData_top">
        <h5>{title}</h5>
        <div className="d-flex justify-content-between align-items-center py-1">
          <span>
            {numeral(viewCount).format("0.a")} Views •
            {moment(publishedAt).fromNow()}
          </span>
          <div>
            <span className="mr-3">
              <MdThumbUp size={26} />
              {numeral(likeCount).format("0.a")}
            </span>
            <span className="mr-3">
              <MdThumbDown size={26} />
              {numeral(disLikeCount).format("0.a")}
            </span>
          </div>
        </div>
      </div>

      <div className="videoMetaData_channel d-flex justify-content-between align-items-center my-2 py-3">
        <div className="d-flex">
          <img
            src={snippet?.thumbnails?.default?.url}
            alt="avatar"
            className="rounded-circle mr-3"
          />
          <div className="d-flex flex-column">
            <span>{channelTitle}</span>
            <span>
              {numeral(statistics?.subscriberCount).format("0.a")} Subscribers
            </span>
          </div>
        </div>
        <div className="d-flex">
          <button
            className={`btn border-0 p-2 m-3 ${
              subscriptionStatus && "btn-gray"
            }`}
          >
            {subscriptionStatus ? "Subscribed" : "Subscribe"}
          </button>
        </div>
      </div>
      <div className="videoMetaData_description">
        <ShowMoreText
          line={3}
          more="Show More"
          less="Show Less"
          anchorClass="showMoreText"
          expanded={false}
          className="show-more"
        >
          {description}
        </ShowMoreText>
      </div>
    </div>
  );
};

export default VideoMetaData;
