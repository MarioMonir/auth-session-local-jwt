const auth = require("./auth.js");
const logger = require("../logger/logger.js");
const config = require("../../config/config.js");

/*  Get Signup , Login ( render views )  */
const signupGet = (req, res, next) => {
    res.render("signup");
};

// ==================================================================

const loginGet = (req, res, next) => {
    res.render("login");
};
// ==================================================================
const logoutGet = async (req, res, next) => {
    res.cookie("jwt", "", { maxAge: 0 });
    res.redirect("/login");
};
// ==================================================================

/* Post SignUp , Login ( Call the database  ) */
const signupPost = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res
            .status(400)
            .send({ message: "Email and password are required " });
    }

    try {
        const token = await auth.signUp({ email, password });
        res.cookie("jwt", token, {
            maxAge: config.jwt.expires,
            secure: false, // https only
            httpOnly: true, // not accessed by js console
        });

        return res.status(200).json({ token });
    } catch (err) {
        next(err);
    }
};

// ==================================================================

const loginPost = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res
            .status(400)
            .send({ message: "Email and password are required " });
    }

    try {
        const token = await auth.login({ email, password });
        if (!token) {
            return res
                .status(401)
                .json({ message: "Invalid email or password" });
        }

        res.cookie("jwt", token, {
            maxAge: config.jwt.expires,
            secure: false, // https only
            httpOnly: true, // not accessed by js console
        });
        return res.status(200).json({ token });
    } catch (err) {
        next(err);
    }
};




// ==================================================================
const protect = async (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) return res.status(401).redirect("/login");

    try {
        const verifiedUser = await auth.protect(token);
        if (!verifiedUser) return res.status(401).redirect("/login");
        
        next();
    } catch (err) {
        next(err);
    }
};

// ==================================================================
const checkUser = async (req,res,next) => {
    res.locals.user = null;
    const token = req.cookies.jwt;
    if(!token) return next();

    const verifiedUser = await auth.protect(token);
    if(!verifiedUser) return next();

    res.locals.user = verifiedUser;
    return next();
}

// ==================================================================
module.exports = {
    signupGet,
    loginGet,
    logoutGet,
    signupPost,
    loginPost,
    protect,
    checkUser
};
