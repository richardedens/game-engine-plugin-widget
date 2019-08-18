
// Logging
const LOG_START = "[GAME-ENGINE]: ";
const LOGLEVEL_TRACE = "TRACE";

// Log Level
export default class Log {
    _logLevel: string;
    constructor() {
        this._logLevel = LOGLEVEL_TRACE;
    }
    info(msg: string) {
        console.info(LOG_START + msg);
    };
    trace(msg: string) {
        if (this._logLevel === "TRACE") {
            console.error(LOG_START + msg);
        }
    };
    error(msg: string) {
        console.error(LOG_START + msg);
        console.trace();
    };
    warning(msg: string) {
        console.warn(LOG_START + msg);
    };
}