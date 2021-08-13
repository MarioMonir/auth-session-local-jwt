/**
 * Database Error Handler for Mongoose
 **/

const dbErrorHandler = (err) => {
    let { errorFrom, name, message, code, errors } = err;
    let errorsMessages = {};

    if (name === "MongoError" && code === 11000) {
        name = "uniqueValidationError";
         errorsMessages.email = "Email has been already used";
    }

    if (err.message.includes("user validation failed")) {
        Object.values(errors).forEach(({ properties }) => {
            if (properties?.path) {
                errorsMessages[properties.path] = properties.message;
            }
        });
    }

    return {
        from: errorFrom || "",
        name: name || "",
        message: message || "",
        errors: errorsMessages || {},
        code: code || "",
        status: 400,
    };
};

module.exports = dbErrorHandler;
