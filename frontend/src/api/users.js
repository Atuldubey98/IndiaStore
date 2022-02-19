import axios from "axios";
const loginApi = async (email, password) => {
  try {
    const data = await axios.post("http://localhost:9000/api/v1/users/login", {
      email,
      password,
    }, {
      headers : {
        "Access-Control-Allow-Origin": "*",
        'Content-Type' : 'application/json'
      }
    });
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const users = {
  loginApi,
};
export default users;
