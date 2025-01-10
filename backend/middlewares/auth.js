const jwt = require("jsonwebtoken");

/**
 * Middleware to authenticate JWT tokens
 */
const authenticate = (req, res, next) => {
    try {
        // Get the Authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized access: No token provided" });
        }

        // Extract the token
        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized access: Token is missing" });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure process.env.JWT_SECRET is set
        if (!decoded || !decoded.userId) {
            return res.status(403).json({ message: "Invalid token payload" });
        }

        // Attach userId to the request object for further use
        req.userId = decoded.userId;

        next(); // Pass control to the next middleware/route handler
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(403).json({
            message: "Invalid or expired token",
            error: error.message,
        });
    }
};

module.exports = authenticate;
