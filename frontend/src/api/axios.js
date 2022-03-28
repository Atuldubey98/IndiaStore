import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://indiastore-env.eba-e5uan2td.ap-south-1.elasticbeanstalk.com/api/v1/",
});

export default axiosInstance;