const dbErrorHandler = require("./dbError");
const logger = require("../logger/logger.js");

// ================================================================

const reportError = (err, cb) => {
    /*
     * here i should clean up all things
     */
    logger.error({ name: err.name, message: err.message });
    cb();
};

// Event Listener for Uncaught Exceptions
const uncaughtException = process.on("uncaughtException", (err) => {
    reportError(err, () => {
        logger.info(`Process ${process.pid} exit `);

        // i think it does not work correctly
        process.exit(1);
    });
});

// can handle unHandledRejection too

// ================================================================

// Catch not found errors middleware
const catchError = (req, res, next) => {
    const message = `Cannot ${req.method} ${req.url}`;
    const err = { name: "not found", message, status: "404" };
    next(err);
};

// Handle Errors
const handleError = (err, req, res, next) => {
    /*  in case of bad request to the database */
    if (err.errorFrom === "database") {
        err = dbErrorHandler(err);
    }

    logger.error({ error: { ...err } });
    return res.status(err.status || 500).json({ error: err });
};

module.exports = { catchError, handleError };
