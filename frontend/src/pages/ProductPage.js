import "./ProductPage.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import Header from "../components/Header";
import { CircularProgress } from "@mui/material";
import SimilarProducts from "../components/SimilarProducts";
import SideMenu from "../components/SideMenu";
import useQuery from "../hooks/useQuery";
const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("products/", {
          params: {
            productId,
          },
        });
        setProduct(response.data.product);
        document.title = response.data.product.productName;
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);
  const query = useQuery();
  return (
    <div className={"product__page"}>
      <Header />
      {query.has("sidemenu") && <SideMenu />}
      {loading ? (
        <CircularProgress />
      ) : error.message ? (
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
          <div className="product__decription">
            <div className="prod__priceName">
              <span className="product__head">Item : </span>
              <h2>{product.productName}</h2>
              <span className="product__head">Item Price : </span>
              <span>Rs. </span><span className="product__price">{product.productPrice}</span>
            </div>
            <div className="product__data">
              <span className="product__head">Item Description : </span>
              <p>
                {product.productDescription} Lorem ipsum dolor, sit amet
                consectetur adipisicing elit. Eligendi quam, fugit repellendus
                eveniet quas similique corporis, velit, atque impedit repellat
                nesciunt sequi ullam numquam! Minus nobis dolores quasi ea
                voluptatibus.
              </p>
            </div>
          </div>
        </div>
      )}
      <SimilarProducts />
    </div>
  );
};
export default ProductPage;
