const mongoose = require("mongoose");
const dbErrorHandler = require("../error/dbError");
const logger = require("../logger/logger.js");

const url =
    process.env.DB_DIALECT +
    "://" +
    process.env.DB_HOST +
    ":" +
    27017 +
    "/" +
    process.env.DB_NAME;

module.exports = connect = () => {
    return mongoose
        .connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })
        .catch((err) => {
            err.errorFrom = "database";
            err = dbErrorHandler(err);
            logger.error({ error: err });
        });
};
