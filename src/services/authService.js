import axios from "axios";
import { baseUrl } from "./baseUrl";

export const get = (route) => {
  let token = localStorage.getItem("authToken");
  // console.log("ENV", process.env);

  return axios.get(baseUrl + route, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const post = (route, body) => {
  let token = localStorage.getItem("authToken");

  console.log("We have reachede line 16!!!!!!!!")

  console.log("This is the token", token)

  return axios.post(baseUrl + route, body, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
