import jwt from 'jsonwebtoken';
const adminAuth = async (req, res, next) => {
  try {
    // Extract the token from either Authorization or token header
    const token =
      req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : req.headers.token;
    if (!token) {
      return res.status(403).json({ success: false, message: "Not allowed login from adminAuth" });
    }
    // Decode and verify the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    // Check if the email matches the admin email
    if (decodedToken.email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({ success: false, message: "Not allowed again from email adminAuth" });
    }
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Admin Auth Error:", error.message);
    res.status(401).json({ success: false, message: "Invalid or Expired Token" });
  }
};

export default adminAuth;