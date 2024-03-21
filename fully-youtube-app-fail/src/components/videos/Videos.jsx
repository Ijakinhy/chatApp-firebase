import React, { useState, useEffect } from "react";
import "./_videos.scss";
import { AiFillEye } from "react-icons/ai";

import { request } from "../../api";
import moment from "moment";
import numeral from "numeral";
import LazyLoad from "react-lazy-load";
import { useNavigate } from "react-router-dom";
const Videos = ({ video }) => {
  const {
    id,
    snippet: {
      publishedAt,
      channelId,
      title,
      channelTitle,
      thumbnails: {
        medium: { url },
      },
    },
  } = video;

  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);
  const [channelIcon, setChannelIcon] = useState(null);

  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format("mm:ss");

  const videoId = id?.videoId || id;
  useEffect(() => {
    const getVideoDetails = async () => {
      const {
        data: { items },
      } = await request("/videos", {
        params: {
          part: "contentDetails,statistics",
          id: videoId,
        },
      });
      setDuration(items[0].contentDetails.duration);
      setViews(items[0].statistics.viewCount);
    };

    getVideoDetails();
  }, [videoId]);

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
      setChannelIcon(items[0].snippet.thumbnails.medium.url);
    };
    getChannelIcon();
  }, [channelId]);
  const navigate = useNavigate();
  const handleWatchVideo = () => {
    navigate(`/watch/${videoId}`);
  };
  return (
    <div className="video" onClick={handleWatchVideo}>
      <div className="video_top">
        <LazyLoad effect="blur">
          <img src={url} alt="thumbnail" />
        </LazyLoad>
        <span className="video_top_duration">{_duration}</span>
      </div>
      <div className="video_title">{title}</div>
      <div className="video_details">
        <span>
          <AiFillEye /> {numeral(views).format("0.a")} Views •
        </span>
        <span>{moment(publishedAt).fromNow()}</span>
      </div>
      <div className="video_channel">
        <LazyLoad effect="blur">
          <img src={channelIcon} alt="channel" />
        </LazyLoad>
        <p>{channelTitle}</p>
      </div>
    </div>
  );
};

export default Videos;
