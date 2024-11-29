const jwt = require('jsonwebtoken'); // Import the jsonwebtoken library for token verification

// Middleware to verify the token
exports.verifyToken = (req, res, next) => {
    // Extract the token from the Authorization header
    const token = req.header('Authorization')?.split(' ')[1];

    // Check if the token is not provided
    if (!token) {
        // Respond with a 401 status and an error message if no token is found
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        // Verify the token using the secret key from environment variables
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // If verification is successful, attach the decoded user information to the request object
        req.user = decoded;
        // Call the next middleware function in the stack
        next();
    } catch (error) {
        // If token verification fails, respond with a 400 status and an error message
        res.status(400).json({ message: 'Invalid token.' });
    }
};