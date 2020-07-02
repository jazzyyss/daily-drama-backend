require('express-async-errors');
const winston = require('winston');
const path = require('path');

let logPath = path.join(__dirname, 'logs')

module.exports = () => {
    winston.createLogger({
        level: 'info',
        transports: [
            new winston.transports.File({ filename: path.join(logPath, 'error.log'), level: 'error' }),
            new winston.transports.File({ filename: path.join(logPath, 'combined.log') }),
            new winston.transports.Console({ colorize: true, prettyPrint: true })
        ],
        exceptionHandlers: [
            new winston.transports.File({ filename: path.join(logPath, 'exceptions.log') })
        ],
        rejectionHandlers: [
            new winston.transports.File({ filename: path.join(logPath, 'rejections.log') })
        ]
    });
}