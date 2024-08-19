import {appendFile} from 'fs';
import {join} from 'path';

const logLevels = {
    DEBUG: 'DEBUG',
    INFO: 'INFO',
    WARN: 'WARN',
    ERROR: 'ERROR',
};

let logFilePath = join(__dirname, 'log/server.log');

// Helper function to write logs to the log file
function writeLog(level, msg) {
    const time = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const logMessage = `[${time}] [${level}] ${msg}\n`;

    appendFile(logFilePath, logMessage, (err) => {
        if (err) {
            console.error(`Error opening the file: ${logFilePath}`);
        }
    });
}

// Log a debug message
function debug(msg) {
    writeLog(logLevels.DEBUG, msg);
}

// Log an info message
function info(msg) {
    writeLog(logLevels.INFO, msg);
}

// Log a warning message
function warn(msg) {
    writeLog(logLevels.WARN, msg);
}

// Log an error message
function error(msg) {
    writeLog(logLevels.ERROR, msg);
}

// Set the path to the log file
function setLogFile(path) {
    logFilePath = path;
}

// Export the functions as a module
export default {
    debug,
    info,
    warn,
    error,
    setLogFile,
};
