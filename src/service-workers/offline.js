export default (app) => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js");
  }
};
