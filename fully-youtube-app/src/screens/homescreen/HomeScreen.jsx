import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import CategoriesBar from "../../components/categoriesBar/CategoriesBar";
import Videos from "../../components/videos/Videos";

const HomeScreen = () => {
  return (
    <Container>
      <CategoriesBar />
      <Row>
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
