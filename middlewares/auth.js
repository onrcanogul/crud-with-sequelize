const { verifyToken } = require('../helpers/jwt');

const authMiddleware = (req, res, next) => {
    const token = req.headers['access-token'];
    if (!token)
        return res.status(401).json({ message: 'Unauthorized' });
    try {
        const decoded = verifyToken(token);
        global.currentUserId = req.user.id;
        req.user = decoded; //send user informations to client.
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Geçersiz token' });
    }
};

module.exports = authMiddleware;
