import axios from "axios";

export const request = axios.create({
  baseURL: "https://youtube.googleapis.com/youtube/v3/",

  params: {
    key: "AIzaSyBdv9ydKxywO_EESvpu7N6b6PPDruU2qro",
  },
});
