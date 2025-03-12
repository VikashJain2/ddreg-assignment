import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    // First, check if the token is in the Authorization header (as a Bearer token)
    const tokenFromHeader = req.headers['authorization']?.split(' ')[1]; // Extract token from "Bearer <token>"

    // If the token is in the header, use it, otherwise fallback to the token in the cookies
    const token = tokenFromHeader || req.cookies.token;

    // If no token is found in either location
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        // Verify the token using the JWT secret
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};

export default authMiddleware;
