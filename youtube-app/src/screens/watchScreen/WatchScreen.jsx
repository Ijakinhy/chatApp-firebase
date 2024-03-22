import React, { useEffect } from "react";
import "./_WatchScreen.scss";
import { Col, Row } from "react-bootstrap";
import VideoMetaData from "../../components/videoMetaData/VideoMetaData";
import VideoHorizontal from "../../components/videoHorizontal/VideoHorizontal";
import Comments from "../../components/comments/Comments";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getVideosById } from "../../redux/actions/video.action";

const WatchScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideosById(id));
  }, [dispatch, id]);

  const { videos, loading } = useSelector((state) => state.selectedVideo);
  return (
    <Row>
      {/* left side */}
      <Col lg={8}>
        <div className="watchScreen_player">
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            title={videos?.snippet?.title}
            allowFullScreen
            width={"100%"}
            height="100%"
            frameborder="0"
          ></iframe>
          {!loading ? (
            <VideoMetaData videos={videos} videoId={id} />
          ) : (
            <h5>Loadin...</h5>
          )}
          <Comments videoId={id} />
        </div>
      </Col>
      {/* right side */}
      <Col lg={4}>
        {[...Array(10)].map(() => (
          <VideoHorizontal />
        ))}
      </Col>
    </Row>
  );
};

export default WatchScreen;
