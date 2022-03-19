import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://ec2-65-2-124-171.ap-south-1.compute.amazonaws.com:9000/api/v1/",
});

export default axiosInstance;