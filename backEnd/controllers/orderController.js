import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Joi from "joi";

// Validation schemas
const orderSchema = Joi.object({
  userId: Joi.string().required(),
  items: Joi.array().items(
    Joi.object({
      itemId: Joi.string().required(),
      size: Joi.string().required(),
      quantity: Joi.number().integer().min(1).required(),
    })
  ).required(),
  amount: Joi.number().min(0).required(),
  address: Joi.string().required(),
});

const updateStatusSchema = Joi.object({
  orderId: Joi.string().required(),
  status: Joi.string().valid("pending", "shipped", "delivered", "cancelled").required(),
});

// Utility function for placing orders
const saveOrder = async ({ userId, items, amount, address, paymentMethod, paymentStatus }) => {
  const orderData = {
    userId,
    items,
    address,
    amount,
    paymentMethod,
    payment: paymentStatus,
    date: Date.now(),
  };
  const newOrder = new orderModel(orderData);
  await newOrder.save();
  await userModel.findByIdAndUpdate(userId, { cartData: {} }); // Clear user cart
  return newOrder;
};

// Placing order using cash on delivery method
const placeOrder = async (req, res) => {
  try {
    await orderSchema.validateAsync(req.body);

    const { userId, items, amount, address } = req.body;
    await saveOrder({
      userId,
      items,
      amount,
      address,
      paymentMethod: "cashOnDelivery",
      paymentStatus: false,
    });

    res.status(201).json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Placing order using Stripe
const placeOrderStripe = async (req, res) => {
  try {
    await orderSchema.validateAsync(req.body);

    const { userId, items, amount, address } = req.body;
    // Stripe payment processing logic goes here (e.g., calling Stripe API)
    const paymentSuccessful = true; // Replace with actual payment status from Stripe

    await saveOrder({
      userId,
      items,
      amount,
      address,
      paymentMethod: "Stripe",
      paymentStatus: paymentSuccessful,
    });

    res.status(201).json({ success: true, message: "Order placed via Stripe" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Placing order using PayTabs
const placeOrderPayTabs = async (req, res) => {
  try {
    await orderSchema.validateAsync(req.body);

    const { userId, items, amount, address } = req.body;
    // PayTabs payment processing logic goes here
    const paymentSuccessful = true; // Replace with actual payment status from PayTabs

    await saveOrder({
      userId,
      items,
      amount,
      address,
      paymentMethod: "PayTabs",
      paymentStatus: paymentSuccessful,
    });

    res.status(201).json({ success: true, message: "Order placed via PayTabs" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Fetch all orders (Admin)
const allOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const orders = await orderModel
      .find({})
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalOrders = await orderModel.countDocuments({});
    res.json({ success: true, orders, totalOrders, page, limit });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Fetch user-specific orders
const userOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const orders = await orderModel
      .find({ userId })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({ success: true, orders, page, limit });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Update order status (Admin)
const updateStatus = async (req, res) => {
  try {
    await updateStatusSchema.validateAsync(req.body);

    const { orderId, status } = req.body;
    const updatedOrder = await orderModel.findByIdAndUpdate(orderId, { status }, { new: true });

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.json({ success: true, message: "Order status updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export { placeOrder, placeOrderStripe, placeOrderPayTabs, allOrders, userOrders, updateStatus };
