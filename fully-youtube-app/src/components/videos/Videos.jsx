import React, { useState, useEffect } from "react";
import "./_videos.scss";
import { AiFillEye } from "react-icons/ai";
import { request } from "../../api";
import moment from "moment";
import numeral from "numeral";
const Videos = ({ video }) => {
  const { views, setViews } = useState(0);
  const { duration, setDuration } = useState(0);
  const [channelIcon, setChannelIcon] = useState(null);
  const {
    id,
    snippet: {
      publishedAt,
      channelId,
      title,
      thumbnails: {
        medium: { url },
      },
      channelTitle,
    },
  } = video;

  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format("mm:ss");

  useEffect(() => {
    const getVideoDetails = async () => {
      const {
        data: { items },
      } = await request("/videos", {
        params: {
          part: "contentDetails,statistics",
          id: id,
        },
      });
      console.log(items);
      // setDuration(items[0].contentDetails.duration);
      // setViews(items[0].statistics.viewCount);
    };
    getVideoDetails();
  }, [id, setDuration, setViews]);
  useEffect(() => {
    const getChannelIcon = async () => {
      const {
        data: { items },
      } = await request("/channels", {
        params: {
          part: "snippet",
          id: channelId,
        },
      });
      setChannelIcon(items[0].snippet.thumbnails.default.url);
    };
    getChannelIcon();
  }, [channelId]);
  return (
    <div className="video">
      <div className="video_top">
        <img src={url} alt="thumbnail" />
        <span>{_duration}</span>
      </div>
      <div className="video_title">{title}</div>
      <div className="video_details">
        <span>
          <AiFillEye /> {numeral(views).format("0.a")} Views •
        </span>
        <span>{moment(publishedAt).fromNow()}</span>
      </div>
      <div className="video_channel">
        <img src={channelIcon} alt="channel" />
        <p>{channelTitle}</p>
      </div>
    </div>
  );
};

export default Videos;
