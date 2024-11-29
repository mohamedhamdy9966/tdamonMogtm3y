import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";
import { ShopContext } from "../context/ShopContext";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  useEffect(() => {
    const product = products.find((item) => item._id === productId);
    console.log(products);
    if (product) {
      setProductData(product);
      // Check if the product has images and set the first image
      if (product && product.images && product.images.length > 0) {
        setProductData(product);
        setImage(product.images[0]);
      }
      console.log("Product Data:", product); // Log the fetched product data
    }
  }, [productId, products]);

  if (!productData) {
    return <div className="text-center mt-10">Loading product...</div>;
  }

  return (
    <div className="border-t-2 pt-10">
      <div className="flex gap-12 flex-col sm:flex-row">
        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse sm:flex-row gap-3">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto sm:w-[18%] w-full gap-2">
            {productData.images && productData.images.length > 0 ? (
              productData.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Product ${index}`}
                  onClick={() => setImage(img)}
                  className={`cursor-pointer w-[24%] sm:w-full ${
                    img === image ? "border-2 border-orange-500" : ""
                  }`}
                />
              ))
            ) : (
              <p>No images available</p>
            )}
          </div>
          <div className="flex-1">
            {image ? (
              <img
                src={image}
                alt="Selected product"
                className="w-full h-auto"
              />
            ) : (
              <div>Image not available</div> // Or display a fallback image here
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h2 className="text-2xl font-medium mt-2">{productData.name}</h2>
          <div className="flex items-center gap-1 mt-2">
            {[...Array(4)].map((_, i) => (
              <img
                key={i}
                src={assets.star_icon}
                alt="star"
                className="w-3.5"
              />
            ))}
            <img
              src={assets.star_dull_icon}
              alt="half star"
              className="w-3.5"
            />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>
          <div className="mt-4">
            <p className="mb-2">Select Size:</p>
            <div className="flex gap-2">
              {/* Ensure sizes is an array before mapping */}
              {Array.isArray(productData.sizes) &&
              productData.sizes.length > 0 ? (
                productData.sizes.map((item) => (
                  <button
                    key={item}
                    onClick={() => setSize(item)}
                    className={`border py-2 px-4 bg-gray-100 ${
                      size === item ? "border-orange-500" : ""
                    }`}
                  >
                    {item}
                  </button>
                ))
              ) : (
                <p>No sizes available</p> // Fallback message if no sizes exist
              )}
            </div>
          </div>
          <button
            onClick={() => addToCart(productData._id, size)}
            disabled={!size}
            className="mt-5 bg-black text-white px-8 py-3 text-sm active:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {size ? "Add To Cart" : "Select Size to Add"}
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 space-y-1">
            <p>100% Customer Satisfaction Guarantee</p>
            <p>Free shipping on orders over £50</p>
            <p>30-day return policy</p>
          </div>
        </div>
      </div>

      {/* Description & Reviews */}
      <div className="mt-20">
        <div className="flex">
          <button className="border px-5 py-3 text-sm font-bold">
            Description
          </button>
          <button className="border px-5 py-3 text-sm">Reviews (122)</button>
        </div>
        <div className="border px-6 py-6 text-sm text-gray-500 space-y-4">
          <p>
            {productData.longDescription ||
              "No additional information available."}
          </p>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  );
};

export default Product;
