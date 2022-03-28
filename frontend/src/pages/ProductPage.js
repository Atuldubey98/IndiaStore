import "./ProductPage.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const token = useSelector((state) => state.userAccess.user.token);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("products/", {
          headers: { Authorization: token },
          params: {
            productId,
          },
        });
        setProduct(response.data.product);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, token]);
  return loading ? (
    <CircularProgress />
  ) : (
    <div className="product__page">
      <Header />
      {error.message ? (
        error.message
      ) : (
        <div className="product__pageProduct">
          <img
            className="product__productImageURL"
            alt={product.productId}
            src={
              product.productImageURL !== ""
                ? product.productImageURL
                : `images/product.jpeg`
            }
          />
          <div className="product__des">
            <strong>{product.productName}</strong>
            <h5>{product.productDescription}</h5>
            <h4>{` ${product.productPrice}`}</h4>
          </div>
        </div>
      )}
    </div>
  );
};
export default ProductPage;
