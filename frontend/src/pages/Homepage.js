import { useEffect, useState } from "react";
import Header from "../components/Header";
import "./HomePage.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import useQuery from "../hooks/useQuery";
import {
  setProduct,
  setProductLoading,
  setProductError,
} from "../redux/actions/productActions";
import Modal from "react-modal";
import axiosInstance from "../api/axios";
import Product from "../components/Product";
import BuyProduct from "../components/BuyProduct";
import { Button, CircularProgress, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Search } from "@material-ui/icons";
const Homepage = () => {
  Modal.setAppElement("#root");
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.productsAccess);
  const query = useQuery();
  const { cart } = useSelector((state) => state.cartAccess);
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  const onCategoryClick = (isAll, categoryId) => {
    navigate(isAll ? "/" : `/?categoryId=${categoryId}`);
  };

  const products = useSelector((state) => {
    return query.get("categoryId")
      ? state.productsAccess.products.filter(
          (product) => product.categoryId === query.get("categoryId")
        )
      : state.productsAccess.products;
  });
  const closeModal = () => {
    navigate("/");
  };
  const onSearchFormSubmit = (e) => {
    e.preventDefault();
    console.log(search);
  };
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      overflowY: "scroll",
      display: "grid",
      justify: "center",
      alignItems: "center",
      transform: "translate(-50%, -50%)",
    },
  };
  useEffect(() => {
    (async () => {
      try {
        dispatch(setProductLoading(true));
        const response = await axiosInstance.get("products/all");
        const responseCategory = await axiosInstance.get("category/all");
        setCategories(responseCategory.data.categories);
        dispatch(setProduct(response.data.products));
      } catch (error) {
        setProductError(error);
      }
    })();
  }, [dispatch]);
  const [search, setSearch] = useState("");
  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div className={"homepage"}>
      <Header />
      <div className="homepage__container">
        <div className="homepage__filters">
          <h3 className="homepage__cathead">
            Categories
          </h3>
          <div className="homepage__filter">
            <Button
              onClick={() => onCategoryClick(true, query.get("categoryId"))}
              variant={query.get("categoryId") ? "outlined" : "contained"}
            >
              All
            </Button>
          </div>

          {categories.map((c) => (
            <div key={c.categoryId} className="homepage__filter">
              <Button
                variant={
                  query.get("categoryId") === c.categoryId ? "contained" : "outlined"
                }
                onClick={() => onCategoryClick(false, c.categoryId)}
                key={c.categoryId}
              >
                {`${c.categoryName} (${
                  query.get("categoryId") === c.categoryId && products
                    ? products.length
                    : 0
                })`}
              </Button>
            </div>
          ))}
        </div>
        <div className={loading ? "homepage__load" : "homepage__products"}>
          {loading ? (
            <CircularProgress />
          ) : products && products.length > 0 ? (
            products.map((product) => (
              <Product key={product.productId} product={product} />
            ))
          ) : (
            <h1 className="no_products">{"No products found"}</h1>
          )}
          <Modal
            isOpen={query.get("searchModal") ? true : false}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Search"
          >
            <h1 style={{ margin: "auto" }}>
              <i>India Store Search</i>
            </h1>
            <div className="homepage__search">
              <form onSubmit={onSearchFormSubmit}>
                <input
                  onChange={onSearchChange}
                  value={search}
                  type="text"
                  name="search"
                  placeholder="Enter search item..."
                />
                <IconButton type="submit">
                  <Search fontSize="large" />
                </IconButton>
              </form>
            </div>
          </Modal>
          {error && <h3>Some error occured</h3>}
        </div>
      </div>
      {cart.length > 0 && <BuyProduct />}
    </div>
  );
};

export default Homepage;
