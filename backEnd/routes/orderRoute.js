import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";
import {
  placeOrder,
  placeOrderPayTabs,
  placeOrderStripe,
  userOrders,
  allOrders,
  updateStatus,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

// Admin Routes
orderRouter.get("/", adminAuth, allOrders); // Get all orders
orderRouter.put("/status", adminAuth, updateStatus); // Update order status

// Payment Routes
orderRouter.post("/", authUser, placeOrder); // Place an order
orderRouter.post("/stripe", authUser, placeOrderStripe); // Stripe payment
orderRouter.post("/paytabs", authUser, placeOrderPayTabs); // PayTabs payment

// User Routes
orderRouter.get("/userorders", authUser, userOrders); // Get user's orders

export default orderRouter;
