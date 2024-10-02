const { verifyToken } = require('../helpers/jwt');

const authMiddleware = (req, res, next) => {
    const token = req.headers['access-token'];
    if (!token)
        return res.status(401).json({ message: 'Unauthorized' });
    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token' });
    }
};
module.exports = authMiddleware;
