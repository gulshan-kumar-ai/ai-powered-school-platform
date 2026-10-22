/**
 * Production-Grade Structured Logger for Govt. Boys Qazi Sultan Higher Secondary School, Kunri
 * Implements automated PII and credential scrubbing to comply with GDPR/FERPA guidelines.
 */

export type LogLevel = "debug" | "info" | "warn" | "error" | "security";

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  module: string;
  message: string;
  metadata?: Record<string, unknown>;
  error?: {
    name: string;
    message: string;
    stack?: string;
  };
}

// Regex patterns for sensitive data redaction
const SENSITIVE_PATTERNS: { pattern: RegExp; replacement: string }[] = [
  // Bearer tokens and JWTs
  { pattern: /Bearer\s+[A-Za-z0-9\-_.]+/gi, replacement: "Bearer [REDACTED_TOKEN]" },
  // API Keys (e.g. sk-..., sk-proj-..., AIzaSy...)
  { pattern: /(sk-[a-zA-Z0-9\-_]{15,}|AIzaSy[a-zA-Z0-9\-_]{30,})/g, replacement: "[REDACTED_API_KEY]" },
  // Passwords in JSON or query params
  { pattern: /("password"\s*:\s*)"[^"]+"/gi, replacement: '$1"[REDACTED_PASSWORD]"' },
  { pattern: /(password=)[^&]+/gi, replacement: "$1[REDACTED_PASSWORD]" },
  // Email addresses (partially mask to preserve diagnostic ability without exposing student PII)
  { pattern: /([a-zA-Z0-9_\-.]{2})[a-zA-Z0-9_\-.]*@([a-zA-Z0-9_\-.]+\.[a-zA-Z]{2,})/g, replacement: "$1***@$2" },
  // Phone numbers (e.g. +1 (555) 438-9000 or 555-438-9000)
  { pattern: /(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}/g, replacement: "[REDACTED_PHONE]" },
  // SSN / National Identification patterns
  { pattern: /\b\d{3}-\d{2}-\d{4}\b/g, replacement: "[REDACTED_ID]" },
];

/**
 * Recursively scrubs sensitive fields and string values from an object or string.
 */
export function scrubSensitiveData<T>(input: T): T {
  if (input === null || input === undefined) {
    return input;
  }

  if (typeof input === "string") {
    let result: string = input;
    for (const { pattern, replacement } of SENSITIVE_PATTERNS) {
      result = result.replace(pattern, replacement);
    }
    return result as unknown as T;
  }

  if (Array.isArray(input)) {
    return input.map((item) => scrubSensitiveData(item)) as unknown as T;
  }

  if (typeof input === "object") {
    const scrubbedObj: Record<string, unknown> = {};
    const sensitiveKeys = new Set([
      "password",
      "token",
      "secret",
      "api_key",
      "apikey",
      "authorization",
      "cookie",
      "credit_card",
      "phone",
      "emergency_contact",
    ]);

    for (const [key, value] of Object.entries(input as Record<string, unknown>)) {
      if (sensitiveKeys.has(key.toLowerCase())) {
        scrubbedObj[key] = "[REDACTED]";
      } else {
        scrubbedObj[key] = scrubSensitiveData(value);
      }
    }
    return scrubbedObj as T;
  }

  return input;
}

class AppLogger {
  public formatLog(
    level: LogLevel,
    module: string,
    message: string,
    metadata?: Record<string, unknown>,
    err?: Error
  ): LogEntry {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      module,
      message: scrubSensitiveData(message),
    };

    if (metadata) {
      entry.metadata = scrubSensitiveData(metadata);
    }

    if (err) {
      entry.error = {
        name: err.name,
        message: scrubSensitiveData(err.message),
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
      };
    }

    return entry;
  }

  private output(entry: LogEntry) {
    const serialized = JSON.stringify(entry);
    switch (entry.level) {
      case "error":
      case "security":
        console.error(serialized);
        break;
      case "warn":
        console.warn(serialized);
        break;
      case "info":
      case "debug":
      default:
        console.log(serialized);
        break;
    }
  }

  public info(module: string, message: string, metadata?: Record<string, unknown>) {
    this.output(this.formatLog("info", module, message, metadata));
  }

  public warn(module: string, message: string, metadata?: Record<string, unknown>) {
    this.output(this.formatLog("warn", module, message, metadata));
  }

  public error(module: string, message: string, err?: Error, metadata?: Record<string, unknown>) {
    this.output(this.formatLog("error", module, message, metadata, err));
  }

  public security(module: string, message: string, metadata?: Record<string, unknown>) {
    this.output(this.formatLog("security", module, message, metadata));
  }

  public debug(module: string, message: string, metadata?: Record<string, unknown>) {
    if (process.env.NODE_ENV !== "production") {
      this.output(this.formatLog("debug", module, message, metadata));
    }
  }
}

export const logger = new AppLogger();
