import axios from "axios";

export const request = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",

  params: {
    key: "AIzaSyAc8E-74W27Du2BxmuHB6z4wKJMc3dpo6I",
  },
});
