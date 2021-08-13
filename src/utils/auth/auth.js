const jwt = require("jsonwebtoken");
const crud = require("../crud/crud.js");
const User = require("../../resources/user/user.model.js");
const logger = require("../logger/logger.js");
const config = require("../../config/config.js");

// ================================================================

// Create a new Token
// take a new user id from the database
// create a new user token based on user id
// user comes in token comes out
const newToken = (user) => {
    return jwt.sign({ id: user._id }, config.jwt.secret, {
        expiresIn: config.jwt.expires,
    });
};

// ================================================================

// Verify a given token
// verify that token was created with the same secret ( hash )
// from the same server
// token comes in user comes out
const verifyToken = (token) =>
    new Promise((resolve, reject) => {
        jwt.verify(token, config.jwt.secret, (err, payload) => {
            if (err) return reject(err);
            
            return resolve(payload);
        });
    });

// ================================================================

// Sign up user by a given object
// create a new token for a new user
// new user payload comes in token comes out
const signUp = async (payload) => {
    try {
        const user = await crud.create(User, payload);
        const token = newToken(user);
        return token;
    } catch (err) {
        throw err;
    }
};

// ================================================================

// Login a user by his email and password
// create a new token for logged in user
// user comes in token comes out
const login = async ({ email, password }) => {
    try {
        const user = await crud.findOne(User, { email });
        if (!user) return false;

        const match = await user.checkPassword(password);
        if (!match) return false;

        const token = newToken(user);
        return token;
    } catch (err) {
        throw err;
    }
};

// ==================================================================
const protect = async (token) => {
    try {
        const payload = await verifyToken(token);
        if (!payload) return false;

        const user = await crud.findOne(User, { _id: payload.id });
        if (!user) return false;

        return user;
    } catch (err) {
        throw err;
    }
};

// ==================================================================
module.exports = { newToken, verifyToken, signUp, login, protect };
