import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://indiastore-app.herokuapp.com/api/v1/",
  withCredentials :  true
});

export default axiosInstance;
