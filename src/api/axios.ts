import axios from "axios";
import { env } from "../helper/env";

const axiosPrivate = axios.create({
    baseURL: `${env.API_URL}`,
    headers: {
        'Content-Type': 'application/json'
    },
    responseType: 'json',
    // withCredentials: true
})

export default axiosPrivate;