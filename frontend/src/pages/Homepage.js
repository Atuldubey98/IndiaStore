import { useEffect, useState } from "react";
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
import BuyProduct from "../components/BuyProduct";
import { Button, CircularProgress } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
const Homepage = () => {
  const token = useSelector((state) => state.userAccess.user.token);
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.productsAccess);

  const { categoryId } = useParams();
  const { cart } = useSelector((state) => state.cartAccess);
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  const onCategoryClick = (isAll, categoryId) => {
    navigate(isAll ? "/" : `/categoryId/${categoryId}`);
  };
  console.log(categoryId);
  const products = useSelector((state) => {
    return categoryId
      ? state.productsAccess.products.filter(
          (product) => product.categoryId === categoryId
        )
      : state.productsAccess.products;
  });
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        dispatch(setProductLoading(true));
        const response = await axiosInstance.get("products/all", {
          headers: { Authorization: token },
        });
        const responseCategory = await axiosInstance.get("category/all", {
          headers: { Authorization: token },
        });
        setCategories(responseCategory.data.categories);
        dispatch(setProduct(response.data.products));
      } catch (error) {
        setProductError(error);
      }
    };
    fetchProducts();
  }, [token, dispatch]);
  return (
    <div className={loading ? "homepageloading" : "homepage"}>
      <Header />
      <div className="homepage__filters">
        <div className="homepage__filter">
          <Button
            onClick={() => onCategoryClick(true)}
            variant={categoryId ? "" : "contained"}
          >
            All
          </Button>
        </div>

        {categories.map((c) => (
          <div key={c.categoryId} className="homepage__filter">
            <Button
              variant={categoryId === c.categoryId ? "contained" : ""}
              onClick={() => onCategoryClick(false, c.categoryId)}
              key={c.categoryId}
            >
              {c.categoryName}
            </Button>
          </div>
        ))}
      </div>
      {loading ? (
        <CircularProgress />
      ) : (
        <div className="homepage__products">
          {products.map((product) => (
            <Product key={product.productId} product={product} />
          ))}
          {error && <h3>Some error occured</h3>}
        </div>
      )}
      {cart.length > 0 && <BuyProduct />}
    </div>
  );
};

export default Homepage;
