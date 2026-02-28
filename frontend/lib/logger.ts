// Logger for frontend (browser or Node.js)
// Writes logs to localStorage (browser) or file (Node.js, for SSR/testing)
// Log format: [hh:mm AM/PM] [YYYY-MM-DD] message

function getTimeAndDate() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  const timeStr = `${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;
  const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  return { timeStr, dateStr };
}

export function logFrontend(message: string) {
  const { timeStr, dateStr } = getTimeAndDate();
  const logMsg = `[${timeStr}] [${dateStr}] ${message}`;
  if (typeof window !== 'undefined' && window.localStorage) {
    // Store logs in localStorage (per minute)
    const now = new Date();
    const minuteKey = `${dateStr}_${String(now.getHours()).padStart(2, '0')}-${String(now.getMinutes()).padStart(2, '0')}`;
    const storageKey = `log_${minuteKey}`;
    const prev = window.localStorage.getItem(storageKey) || '';
    window.localStorage.setItem(storageKey, prev + logMsg + '\n');
  } else if (typeof require !== 'undefined') {
    // Node.js (SSR/testing): write to file
    try {
      const fs = require('fs');
      const path = require('path');
      const logDir = path.join(process.cwd(), 'logs');
      if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });
      const now = new Date();
      const minuteKey = `${dateStr}_${String(now.getHours()).padStart(2, '0')}-${String(now.getMinutes()).padStart(2, '0')}`;
      const logFile = path.join(logDir, `${minuteKey}.log`);
      fs.appendFileSync(logFile, logMsg + '\n', 'utf8');
    } catch (err) {
      // fallback to console
      // eslint-disable-next-line no-console
      console.log(logMsg);
    }
  } else {
    // fallback to console
    // eslint-disable-next-line no-console
    console.log(logMsg);
  }
}
