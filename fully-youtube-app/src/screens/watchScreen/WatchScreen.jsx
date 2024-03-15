import React from "react";
import "./_WatchScreen.scss";
import { Col, Row } from "react-bootstrap";
import VideoMetaData from "../../components/videoMetaData/VideoMetaData";
import VideoHorizontal from "../../components/videoHorizontal/VideoHorizontal";
import Comments from "../../components/comments/Comments";

const WatchScreen = () => {
  return (
    <Row>
      {/* left side */}
      <Col lg={8}>
        <div className="watchScreen_player">
          <iframe
            src="https://www.youtube.com/embed/tgbNymZ7vqY"
            title="my video"
            allowFullScreen
            width={"100%"}
            height="100%"
            frameborder="0"
          ></iframe>
          <VideoMetaData />
          <Comments />
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
