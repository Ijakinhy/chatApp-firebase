import axios from "axios";

export const request = axios.create({
  baseURL: " https://youtube.googleapis.com/youtube/v3/",

  params: {
    key: "AIzaSyDwQL1EqCoWgSjYYK2n7RVGBjg1rhsHZ4Q",
  },
});
