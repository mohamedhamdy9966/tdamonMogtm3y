import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";
import mongoose from "mongoose";

// Add product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      category,
      subCategory,
      sizes,
      bestSeller,
      colors,
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];
    
    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );
    
    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );
    
    console.log(
      name,
      price,
      description,
      category,
      subCategory,
      sizes,
      bestSeller,
      colors
    );
    console.log(imagesUrl);

    const productData = {
      name,
      price: Number(price),
      description,
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestSeller: bestSeller === "true" || bestSeller === true,
      colors: JSON.parse(colors),
      image: imagesUrl, 
      date: Date.now(),
    };

    console.log(productData);

    const product = new productModel(productData);
    await product.save();

    res
      .status(201)
      .json({ success: true, message: "Product added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to add product" });
  }
};

// List products with pagination and filtering
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch products" });
  }
};

// Remove product
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "product removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Fetch single product
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { listProducts, singleProduct, removeProduct, addProduct };
