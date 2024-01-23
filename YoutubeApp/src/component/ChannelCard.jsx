import React from "react";
import { Box, CardContent, Typography, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";
import { CheckCircle } from "@mui/icons-material";
import { demoChannelTitle, demoProfilePicture } from "../utils/constants";

const ChannelCard = ({ channelDetail }) => {
  console.log(channelDetail);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: { xs: "356px", md: "320px" },
        height: "326px",
        boxShadow: "none",
        margin: "auto",
      }}
    >
      <Link to={`/channel/${channelDetail?.id?.channelId}`}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            boxShadow: "none",
          }}
        >
          <CardMedia
            image={`${
              channelDetail?.snippet?.thumbnails?.high?.url ||
              demoProfilePicture
            }`}
            alt={channelDetail?.snippet?.title}
            sx={{ borderRadius: "50%", width: "180px", height: "180px" }}
          />
        </CardContent>
        <Typography variant="h6" color="#fff" fontWeight="bold">
          {channelDetail?.snippet?.title || demoChannelTitle}
          <CheckCircle
            sx={{ fontSize: "14px", color: "gray", marginLeft: "5px" }}
          />
        </Typography>
        {channelDetail?.statistics?.subscriberCount && (
          <Typography>
            {parseInt(
              channelDetail?.statistics?.subscriberCount
            ).toLocaleString()}
            Subscribers
          </Typography>
        )}
      </Link>
    </Box>
  );
};

export default ChannelCard;
