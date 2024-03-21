import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import CategoriesBar from "../../components/categoriesBar/CategoriesBar";
import Videos from "../../components/videos/Videos";
import {
  getPopularVideos,
  getVideosByCategory,
} from "../../redux/actions/video.action";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import Skeleton from "react-loading-skeleton";
import SkeletonVideos from "../../components/skeletons/SkeletonVideos";
const HomeScreen = () => {
  const dispatch = useDispatch();
  const { videos, activeCategory, loading } = useSelector(
    (state) => state.homeVideos
  );

  useEffect(() => {
    dispatch(getPopularVideos());
  }, [dispatch]);
  const fetchData = () => {
    if (activeCategory === "All") {
      dispatch(getPopularVideos());
    } else {
      dispatch(getVideosByCategory(activeCategory));
    }
  };
  return (
    <Container className="video_container">
      <CategoriesBar />
      {/* <InfiniteScroll
        dataLength={videos.length}
        next={fetchData}
        hasMore={true}
        loader={
          <div className="spinner-border text-danger d-block mx-auto"></div>
        }
      > */}
      <Row className="row_video">
        {!loading ? (
          videos.map((video, id) => {
            return (
              <Col key={id} lg={3} md={4}>
                <Videos video={video} />
              </Col>
            );
          })
        ) : (
          <Col lg={3} md={4}>
            {[...Array(20)].map(() => (
              <SkeletonVideos />
            ))}
          </Col>
        )}
      </Row>
      {/* </InfiniteScroll> */}
    </Container>
  );
};

export default HomeScreen;
