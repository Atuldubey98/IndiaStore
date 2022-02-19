import axiosInstance from "./axios";
const loginApi = async (email, password) => {
  try {
    const data = axiosInstance.post("users/login", { email, password });
    return data;
  } catch (error) {
    return null;
  }
};

const users = {
  loginApi,
};
export default users;
