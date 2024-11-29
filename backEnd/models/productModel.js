import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    image: { type: Array, required: true },
    category: { type: String, required: true, trim: true },
    subCategory: { type: String, required: true, trim: true },
    colors: { type: Array, required: true }, 
    sizes: { type: Array, required: true },
    bestSeller: { type: Boolean },
    date: { type: Date, required: true},
  }
);

const productModel = mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;