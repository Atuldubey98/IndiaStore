import { useEffect } from "react";
import Header from "../components/Header";
import "./HomePage.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  setProduct,
  setProductLoading,
  setProductError,
} from "../redux/actions/productActions";
import axiosInstance from "../api/axios";
import Product from "../components/Product";
import Footer from "../components/Footer";
const Homepage = () => {
  const token = useSelector((state) => state.userAccess.user.token);
  const { products, loading, error } = useSelector(
    (state) => state.productsAccess
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        dispatch(setProductLoading(true));
        const response = await axiosInstance.get("products/all", {
          headers: { Authorization: token },
        });
        dispatch(setProduct(response.data.products));
      } catch (error) {
        setProductError(error);
      }
    };
    fetchProducts();
  }, [token, dispatch]);
  return (
    <div className="homepage">
      <Header />
      <div className="homepage__products">
        {loading ? (
          <h1>Loading</h1>
        ) : (
          products.map((product) => (
            <Product key={product.productId} product={product} />
          ))
        )}
        {error && <h3>Some error occured</h3>}
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;
