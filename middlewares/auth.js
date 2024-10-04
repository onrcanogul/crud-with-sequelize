const { verifyToken } = require('../helpers/jwt');

const authMiddleware = (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token)
        return res.status(401).json({ message: 'Unauthorized' });
    try {
        const decoded = verifyToken(token);
        console.log(decoded);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token' });
    }
};
module.exports = authMiddleware;
