import env from "@fastify/env";

declare module "fastify" {
  export interface FastifyInstance {
    config: {
      PORT: number;
      MONGODB_URI: string;
      COOKIE_SECRET: string;
      COOKIE_NAME: string;
      COOKIE_SECURED: boolean;
      RATE_LIMIT_MAX: string;
      RATE_LIMIT_TIME_WINDOW: string;
      MONGODB_DB_NAME: string;
      HSTS_ENABLED: boolean;
      HSTS_MAX_AGE: string;
      HSTS_INCLUDE_SUB_DOMAINS: boolean;
      HSTS_PRELOAD: boolean;
      X_FRAME_OPTIONS: string;
      UNDER_PRESSURE_MAX_EVENT_LOOP_DELAY: number;
      UNDER_PRESSURE_MAX_HEAP_USED_BYTES: string;
      UNDER_PRESSURE_MAX_RSS_BYTES: string;
      UNDER_PRESSURE_MAX_EVENT_LOOP_UTILIZATION: string;
      UNDER_PRESSURE_MESSAGE: string;
      UNDER_PRESSURE_RETRY_AFTER: string;
      UNDER_PRESSURE_HEALTH_CHECK_INTERVAL: string;
      MONGODB_HEALTH_CHECK_COLLECTION: string;
      SESSION_SECRET_KEY: string;
      SESSION_NAME: string;
      JWT_SECRET_KEY: string;
    };
  }
}

const schema = {
  type: "object",
  required: [
    "MONGODB_URI",
    "COOKIE_SECRET",
    "COOKIE_NAME",
    "COOKIE_SECURED",
    "MONGODB_DB_NAME",
    "SESSION_SECRET_KEY",
    "JWT_SECRET_KEY",
    "SESSION_NAME",
  ],
  properties: {
    // Server
    SESSION_SECRET_KEY: {
      type: "string",
    },
    JWT_SECRET_KEY: {
      type: "string",
    },
    SESSION_NAME: {
      type: "string",
    },
    // Database
    MONGODB_URI: {
      type: "string",
    },
    MONGODB_DB_NAME: {
      type: "string",
    },

    // Security
    COOKIE_SECRET: {
      type: "string",
    },
    COOKIE_NAME: {
      type: "string",
    },
    COOKIE_SECURED: {
      type: "boolean",
      default: true,
    },
    RATE_LIMIT_MAX: {
      type: "string",
      default: "100", // Put it to 4 in your .env file for tests
    },
    RATE_LIMIT_TIME_WINDOW: {
      type: "string",
      default: "1 minute", // Put it to 4 in your .env file for tests
    },

    UNDER_PRESSURE_MAX_EVENT_LOOP_DELAY: {
      type: "number",
      default: 1000,
    },
    UNDER_PRESSURE_MAX_HEAP_USED_BYTES: {
      type: "string",
      default: "100000000",
    },
    UNDER_PRESSURE_MAX_RSS_BYTES: {
      type: "string",
      default: "1000000000",
    },
    UNDER_PRESSURE_MAX_EVENT_LOOP_UTILIZATION: {
      type: "string",
      default: "0.98",
    },
    UNDER_PRESSURE_MESSAGE: {
      type: "string",
      default: "The server is under pressure, retry later!",
    },
    UNDER_PRESSURE_RETRY_AFTER: {
      type: "string",
      default: "50",
    },
    UNDER_PRESSURE_HEALTH_CHECK_INTERVAL: {
      type: "string",
      default: "5000",
    },
    MONGODB_HEALTH_CHECK_COLLECTION: {
      type: "string",
      default: "health",
    },
  },
};

export const autoConfig = {
  // Decorate Fastify instance with `config` key
  // Optional, default: 'config'
  confKey: "config",

  // Schema to validate
  schema,

  // Needed to read .env in root folder
  dotenv: true,
  // or, pass config options available on dotenv module
  // dotenv: {
  //   path: `${import.meta.dirname}/.env`,
  //   debug: true
  // }

  // Source for the configuration data
  // Optional, default: process.env
  data: process.env,
};

/**
 * This plugins helps to check environment variables.
 *
 * @see {@link https://github.com/fastify/fastify-env}
 */
export default env;
