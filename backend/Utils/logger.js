const fs = require("fs");
const path = require("path");

const logFilePath = path.join(__dirname, "..", "audit.log");

/*
  Writes security-related events to an audit log.
*/
function logAction(action) {
  const timestamp = new Date().toISOString();

  const logEntry = `[${timestamp}] ${action}\n`;

  fs.appendFile(logFilePath, logEntry, (err) => {
    if (err) {
      console.error("Failed to write audit log:", err);
    }
  });
}

module.exports = logAction;
