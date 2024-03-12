import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import CategoriesBar from "../../components/categoriesBar/CategoriesBar";
import Videos from "../../components/videos/Videos";
import { getPopularVideos } from "../../redux/actions/video.action";
import "./_homescreen.scss";
import { useDispatch, useSelector } from "react-redux";
const HomeScreen = () => {
  const dispatch = useDispatch();
  const { videos } = useSelector((state) => state.homeVideos);

  useEffect(() => {
    dispatch(getPopularVideos());
  }, [dispatch]);
  return (
    <Container className="video_container">
      <CategoriesBar />
      <Row className="row_video">
        {videos.map((video, id) => {
          return (
            <Col key={id} lg={3} md={4}>
              <Videos video={video} />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default HomeScreen;
