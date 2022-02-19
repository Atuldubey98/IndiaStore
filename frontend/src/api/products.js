import axiosInstance from "./axios";
import { useSelector } from "react-redux";
const getProducts = () => {
  const token = useSelector((state) => state.userAccess.user.token);
  try {
    const response = await axiosInstance.get("/products/all", {
      headers: { Authorization: token },
    });
    if (response) {
      return response.data;
    }
  } catch (error) {
    return null;
  }
};

const products = {
  getProducts,
};
export default products;
