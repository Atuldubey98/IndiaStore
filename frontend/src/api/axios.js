import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://indiastore-app.herokuapp.com",
  withCredentials :  true
});

export default axiosInstance;
