import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import CategoriesBar from "../../components/categoriesBar/CategoriesBar";
import Videos from "../../components/videos/Videos";
import "./_homescreen.scss";
const HomeScreen = () => {
  return (
    <Container className="video_container">
      <CategoriesBar />
      <Row className="row_video">
        {[...new Array(20)].map(() => {
          return (
            <Col lg={3} md={4}>
              <Videos />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default HomeScreen;
