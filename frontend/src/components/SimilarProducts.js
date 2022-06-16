import { KeyboardArrowDown, KeyboardArrowUpRounded } from "@material-ui/icons";
import { IconButton } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import "./SimilarProducts.css";
const SimilarProducts = () => {
  const products = useSelector((state) => state.productsAccess.products);
  const [openSimilar, setOpenSimilar] = useState(true);
  const ref = useRef();
  const length = products.length / 2;
  useEffect(() => {
    const similarRef = ref.current;
    similarRef.addEventListener("wheel", (e) => {
      e.preventDefault();
      similarRef.scrollLeft += e.deltaY;
    });
    return () => {
      similarRef.removeEventListener("wheel", () => {});
    };
  }, []);
  return (
    <div className="similar">
      <div className="similar__icons">
        <IconButton onClick={() => setOpenSimilar((o) => !o)}>
          {openSimilar ? <KeyboardArrowDown /> : <KeyboardArrowUpRounded />}
        </IconButton>
        <p className="similar__head">Similar Products</p>
      </div>
      {openSimilar && (
        <div ref={ref} className="similar__products">
          {length > 0 &&
            products.map(
              (p, index) =>
                index < length && (
                  <div key={p.productId} className="similar__product">
                    <img src={p.productImageURL} alt={p.productId} />
                    <div className="similar__productDes">
                      <strong>{p.productName}</strong>
                    </div>
                  </div>
                )
            )}
        </div>
      )}
    </div>
  );
};
export default SimilarProducts;
