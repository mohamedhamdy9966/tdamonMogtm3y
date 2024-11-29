import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
      match: [/^\d{10,15}$/, "Please enter a valid mobile number"], // Matches numbers of length 10-15
    },
    password: { type: String, required: true },
    cartData: {
      type: Object,
      default: {},
    }
    // isAdmin: { type: Boolean, default: false }, // Optional: Tracks if the user is an admin
  },
  { minimize: false, timestamps: true }
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;