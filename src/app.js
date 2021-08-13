const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const logger = require("./utils/logger/logger.js");
const { catchError, handleError } = require("./utils/error/errorHandler.js");

const { protect , checkUser } = require("./utils/auth/authController.js");

const httpStream = {
    write: (req) => logger.http(req.split(`"`).slice(1, 3)),
};

// Connect to Database ==================================================
const connect = require("./utils/crud/database.js");
connect();

// Routers ==============================================================
const authRouter = require("./utils/auth/authRouter.js");
const smoothyRouter = require("./resources/smooty/smoothy.route.js");

// MiddleWare tools =====================================================
app.use(cors());
app.disable("x-powered-by");
app.use(cookieParser());
app.use(morgan("combined", { stream: httpStream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../public")));
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

// Routers Middleware ====================================================
app.route('*').get(checkUser)
app.use(authRouter);
app.use("/smoothy", protect, smoothyRouter);

// index router ==========================================================
app.route("/").get((req, res, next) => {
    try {
        res.render("home");
    } catch (err) {
        next(err);
    }
});

// Error Handler Middleware ==============================================
app.use(catchError);
app.use(handleError);

module.exports = app;
