const bcrypt = require('bcryptjs');
const asyncHandler = require("../wrappers/asyncHandler");
const User = require('../models/user');
const { generateToken } = require('../helpers/jwt');


exports.register = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, userName, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ firstName, lastName, email, userName, password: hashedPassword });
    const token = generateToken(user.id);
    res.status(200).json(token);
});

exports.login = asyncHandler(async (req, res) => {
    const { userName, password } = req.body;
    const user = await User.findOne({ where: { userName } });
    if (!user)
        return res.status(404).json({ error: 'user not found' });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
        return res.status(404).json({ error: 'user not found' });
    const token = generateToken(user.id);
    const options = {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        httpOnly: true,
    };
    return res.json(200).cookie("token", token, options).json(token);
})