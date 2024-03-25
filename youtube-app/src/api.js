import axios from "axios";

export const request = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",

  params: {
    key: "AIzaSyB2a7r7QSQfx02WAGjS3xUjIG_cPFuds1w",
  },
});
