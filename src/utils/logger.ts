type LogLevel = "info" | "warn" | "error";

function write(level: LogLevel, message: string, meta?: unknown) {
    const line = `[${new Date().toISOString()}] ${level.toUpperCase()} ${message}`;

    if (level === "error") {
        meta ? console.error(line, meta) : console.error(line);
        return;
    }

    if (level === "warn") {
        meta ? console.warn(line, meta) : console.warn(line);
        return;
    }

    meta ? console.log(line, meta) : console.log(line);
}

export const logger = {
    info: (message: string, meta?: unknown) => write("info", message, meta),
    warn: (message: string, meta?: unknown) => write("warn", message, meta),
    error: (message: string, meta?: unknown) => write("error", message, meta),
};