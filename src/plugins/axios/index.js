import axios from "axios";

export const coinmarketcapApi = axios.create({
  headers: {
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  baseURL: "/coinmarketcap",
});
