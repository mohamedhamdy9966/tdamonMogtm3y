import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    image: [{ type: Array, required: true }],
    category: { type: String, required: true, trim: true },
    subCategory: { type: String, required: true, trim: true },
    colors: [{ type: Array, required: true }], // Array of strings for color names
    sizes: [{ type: Array, required: true }], // Array of strings for size options
    bestSeller: { type: Boolean },
    date: { type: Date, default: Date.now },
  }
);

const productModel = mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;