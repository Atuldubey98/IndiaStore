import axios from "axios";
console.log(process.env.NODE_ENV)
const axiosInstance = axios.create({
  baseURL: process.env.NODE_ENV && process.env.NODE_ENV === "development" ? "http://192.168.1.16:9000/api/v1/" : "https://indiastore-app.herokuapp.com/api/v1/",
  withCredentials :  true
});

export default axiosInstance;
