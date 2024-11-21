import { axiosInstance } from "@/plugins/axios";

class Api {
  static get(url) {
    return new Promise((res, rej) => {
      axiosInstance
        .get(url)
        .then((response) => {
          res(response.data);
        })
        .catch((err) => rej(err.response));
    });
  }
  static post(url, datas) {
    return new Promise((res, rej) => {
      axiosInstance
        .post(url, datas)
        .then((response) => {
          res(response.data);
        })
        .catch((err) =>
          err?.response?.data ? res(err.response.data) : rej(err),
        );
    });
  }
}

export default Api;
