const fs = require("fs");
const path = require("path");

/**
 * Logger that writes logs to a new file every minute.
 * Log files are named as logs/YYYY-MM-DD_HH-mm.log
 */
class PerMinuteLogger {
  constructor(logDir = path.join(process.cwd(), "logs")) {
    this.logDir = logDir;
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
    this.currentFile = null;
    this.currentMinute = null;
  }

  _getLogFileName() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hour = String(now.getHours()).padStart(2, "0");
    const minute = String(now.getMinutes()).padStart(2, "0");
    return path.join(
      this.logDir,
      `${year}-${month}-${day}_${hour}-${minute}.log`,
    );
  }

  log(message) {
    const now = new Date();
    const minuteKey = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}-${now.getHours()}-${now.getMinutes()}`;
    if (this.currentMinute !== minuteKey) {
      this.currentMinute = minuteKey;
      this.currentFile = this._getLogFileName();
    }
    // Format time as [hh:mm AM/PM] and date as [YYYY-MM-DD]
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const timeStr = `${String(hours).padStart(2, "0")}:${minutes} ${ampm}`;
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    const logMsg = `[${timeStr}] [${dateStr}] ${message}\n`;
    fs.appendFileSync(this.currentFile, logMsg, "utf8");
  }
}

module.exports = new PerMinuteLogger();
