/**
 * Simple logging utility for API routes
 */

type LogLevel = "info" | "warn" | "error" | "debug";

export class Logger {
  private context: string;

  constructor(context: string) {
    this.context = context;
  }

  private formatMessage(level: LogLevel, message: string, meta?: any): string {
    const timestamp = new Date().toISOString();
    const metaStr = meta ? ` | ${JSON.stringify(meta)}` : "";
    return `[${timestamp}] [${level.toUpperCase()}] [${this.context}] ${message}${metaStr}`;
  }

  info(message: string, meta?: any) {
    console.log(this.formatMessage("info", message, meta));
  }

  warn(message: string, meta?: any) {
    console.warn(this.formatMessage("warn", message, meta));
  }

  error(message: string, error?: any) {
    console.error(
      this.formatMessage("error", message, {
        error: error instanceof Error ? error.message : error,
      })
    );
  }

  debug(message: string, meta?: any) {
    if (process.env.NODE_ENV === "development") {
      console.debug(this.formatMessage("debug", message, meta));
    }
  }
}

export function createLogger(context: string): Logger {
  return new Logger(context);
}
