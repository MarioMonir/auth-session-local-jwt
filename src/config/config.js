"use strict";
const config = {
    [process.env.NODE_ENV || "development"]: {
        username: process.env.DB_USER || "mario",
        password: process.env.DB_PASS || "mariomario",
        database: process.env.DB_NAME || "marioTut3",
        host: process.env.DB_HOST || "127.0.0.1",
        dialect: "mongodb",
        logging: false,
        jwt: {
            secret: process.env.JWT_SECRET || "mario",
            expires: process.env.JWT_EXPIRES || 24 * 60 * 60 * 1000,
        },
    },
};

module.exports = config[process.env.NODE_ENV || "development"];
