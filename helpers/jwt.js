const jwt = require('jsonwebtoken');
const secretKey = 'securitykeykeykeykkeykekykeyk124'; //it will be added to env 
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, secretKey, { expiresIn: '1h' });
};
const verifyToken = (token) => {
    return jwt.verify(token, secretKey);
};
module.exports = { generateToken, verifyToken };