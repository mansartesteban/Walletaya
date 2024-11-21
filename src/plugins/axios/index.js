import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 8000,
  headers: {
    Accept: "application/json",
  },
});

export const coinmarketcapApi = axios.create({
  headers: {
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  baseURL: "/coinmarketcap",
});
