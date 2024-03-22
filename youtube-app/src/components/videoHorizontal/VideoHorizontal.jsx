import React from "react";
import moment from "moment";
import numeral from "numeral";
import LazyLoad from "react-lazy-load";
import "./_videoHorizontal.scss";
import { Col, Row } from "react-bootstrap";
import { AiFillEye } from "react-icons/ai";

const VideoHorizontal = () => {
  const seconds = moment.duration(10000).asSeconds();
  const _duration = moment.utc(seconds * 1000).format("mm:ss");

  return (
    <Row className="videoHorizontal m-1 py-2 align-items-center">
      <Col xs={6} md={4} className="videoHorizontal_left">
        <LazyLoad effect="blur">
          <img
            src="https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"
            alt="avatar"
            className="videoHorizontal_thumbnail"
          />
        </LazyLoad>
        <span className="videoHorizontal_duration">{_duration}</span>
      </Col>
      <Col className="videoHorizontal_right p-0" xs={6} md={8}>
        <p className="videoHorizontal_title mb-1">
          be a full stack ddeveloper in 1year
        </p>
        <div className="videoHorizontal_details">
          <span className="videoHorizontal">
            <AiFillEye /> {numeral(10000).format("0.a")} Views •
          </span>
          <span>{moment("2020-02-09").fromNow()}</span>
        </div>
        <div className="videoHorizontal_channel d-flex align-items-center my-1">
          {/* <LazyLoad effect="blur">
            <img
              src="https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"
              alt="avatar"
              className="videoHorizontal_thumbnail"
            /> */}
          {/* </LazyLoad> */}
          <p>channel name</p>
        </div>
      </Col>
    </Row>
  );
};

export default VideoHorizontal;
