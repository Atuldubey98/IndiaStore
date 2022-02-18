import axios from "axios";
const loginApi = (email, password) => {
  try {
    const data = await axios.post("http://localhost:9000/api/v1/users/login", {
      email,
      password,
    });
    return data;
  } catch (error) {
    return null;
  }
};

export default {
  loginApi,
};
