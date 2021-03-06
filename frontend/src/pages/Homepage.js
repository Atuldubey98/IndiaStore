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
import { useNavigate, useLocation } from "react-router-dom";
import {
  Search,
  FilterList,
  KeyboardArrowUpSharp,
  Close,
} from "@material-ui/icons";
import Slider from "@mui/material/Slider";
import SideMenu from "../components/SideMenu";
const Homepage = () => {
  Modal.setAppElement("#root");
  const [price, setPrice] = useState(0);

  const [openFilters, setOpenFilters] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, error } = useSelector((state) => state.productsAccess);
  const query = useQuery();
  const { cart } = useSelector((state) => state.cartAccess);
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  const onCategoryClick = (isAll, categoryId) => {
    navigate(isAll ? "/" : `/?categoryId=${categoryId}`);
  };
  const products = useSelector((state) => {
    let ps = query.has("s")
      ? state.productsAccess.products.filter(
          (p) =>
            p.productName.includes(query.get("s")) ||
            p.productDescription.includes(query.get("s"))
        )
      : state.productsAccess.products;
    ps = query.has("categoryId")
      ? ps.filter((p) => p.categoryId === query.get("categoryId"))
      : ps;
    ps = query.has("max")
      ? ps.filter((p) => p.productPrice <= query.get("max"))
      : ps;
    return ps;
  });
  const closeModal = () => {
    navigate("/");
  };
  const onSearchFormSubmit = (e) => {
    e.preventDefault();
    navigate(`${location.pathname}?s=${search}`);
  };
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      display: "grid",
      justify: "center",
      alignItems: "center",
      transform: "translate(-50%, -50%)",
    },
  };
  useEffect(() => {
    document.title = "India Store - Products";
  }, []);
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
  const onPriceChange = (e) => {
    setPrice(e.target.value);
  };
  const onPriceFilter = () => {
    navigate(`${location.pathname}?max=${price}`);
  };

  return (
    <div className={"homepage"}>
      <Header />
      <div className="homepage__container">
        {!loading && openFilters ? (
          <div className="homepage__filters">
            <IconButton
              onClick={() => {
                setOpenFilters((o) => !o);
              }}
            >
              <KeyboardArrowUpSharp />
            </IconButton>
            <div className="homepage__filterCat">
              <h3 className="homepage__cathead">Categories</h3>
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
                      query.get("categoryId") === c.categoryId
                        ? "contained"
                        : "outlined"
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

            <div className="homepage__filterCat">
              <h3 className="homepage__cathead">Price Range</h3>
              <div className="homepage__priceFilter">
                <Slider
                  max={Math.max.apply(
                    null,
                    products.map((p) => p.productPrice)
                  )}
                  min={Math.min.apply(
                    null,
                    products.map((p) => p.productPrice)
                  )}
                  value={price}
                  onChange={onPriceChange}
                  valueLabelDisplay={"auto"}
                />
                <div className="homepage__prices">
                  <h4>
                    {Math.min.apply(
                      null,
                      products.map((p) => p.productPrice)
                    )}
                  </h4>
                  <h4>
                    {Math.max.apply(
                      null,
                      products.map((p) => p.productPrice)
                    )}
                  </h4>
                </div>
                <Button onClick={onPriceFilter} variant="contained">
                  Apply Less than
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="home__filters">
            <IconButton
              onClick={() => {
                setOpenFilters((o) => !o);
              }}
            >
              <FilterList />
            </IconButton>
          </div>
        )}
        {query.has("sidemenu") && <SideMenu />}
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
            <h2 className="searchModal__head">
              <i>India Store - Search</i>
              <IconButton onClick={closeModal}>
                <Close />
              </IconButton>
            </h2>
            <div className="homepage__search">
              <form autoComplete="off" onSubmit={onSearchFormSubmit}>
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
