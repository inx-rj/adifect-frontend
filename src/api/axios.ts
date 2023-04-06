import axios from "axios";
import { env } from "../helper/env";

const access_token = () => localStorage.getItem("access_token");

const axiosPrivate = axios.create({
  baseURL: `${env.API_URL}`,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${access_token()}`,
  },
  responseType: "json",
  // withCredentials: true
});

export default axiosPrivate;