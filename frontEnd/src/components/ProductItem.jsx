import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ProductItem = ({ id, images = [], name, price }) => {
  const { currency } = useContext(ShopContext);

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "USD",
  }).format(price);

  return (
    <Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
      <div className="overflow-hidden">
        <img
          className="hover:scale-110 transition ease-in-out"
          src={images.length > 0 ? images[0] : "placeholder.jpg"}
          alt={name || "Product Image"}
        />
      </div>
      <p className="pt-3 pb-1 text-sm">{name}</p>
      <p className="text-sm font-medium">{formattedPrice}</p>
    </Link>
  );
};

ProductItem.propTypes = {
  id: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

ProductItem.defaultProps = {
  images: [],
};

export default ProductItem;
