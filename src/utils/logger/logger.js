const winston = require("winston");

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};

const level = () => {
    const env = process.env.NODE_ENV || "development";
    const isDevelopment = env === "development";
    return isDevelopment ? "debug" : "warn";
};

const colors = {
    error: "red",
    warn: "yellow",
    info: "green",
    http: "magenta",
    debug: "white",
};

winston.addColors(colors);

const format = winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD hh:mm:ss:ms" }),
    winston.format.printf(
        (info) => `${info.timestamp} : ${info.level} : ${JSON.stringify(info.message)}`
     )
);

const transports = [
    new winston.transports.File({
        filename: "logs/info.log",
        level: "info",
    }),
    new winston.transports.File({
        filename: "logs/error.log",
        format:winston.format.combine(
            winston.format.timestamp({ format: "YYYY-MM-DD hh:mm:ss:ms" }),
            winston.format.printf( (info) => `${info.timestamp} : ${info.level} : ${JSON.stringify(info.message)}`)
        ),
        level: "error",
    }),
    new winston.transports.File({ filename: "logs/combined.log" }),
];

const logger = winston.createLogger({
    level: level(),
    levels,
    format,
    transports,
});

if (process.env.NODE_ENV !== "production") {
    logger.add(
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.timestamp({ format: "YYYY-MM-DD hh:mm:ss:ms" }),
                winston.format.colorize({ all: true }),
                winston.format.printf(
                    (info) =>
                        `${info.timestamp} : ${info.level} : ${info.message}`
                )
            ),
        })
    );
}

module.exports = logger;
