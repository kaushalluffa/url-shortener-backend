import env from "@fastify/env";
import fp from "fastify-plugin";

const schema = {
  type: "object",
  required: [
    "MONGODB_URI",
    "MONGODB_DB_NAME",
    "JWT_SECRET_KEY",
    "CORS_ORIGIN_URL",
    "REFRESH_TOKEN_EXPIRES_IN",
    "ACCESS_TOKEN_EXPIRES_IN",
    "NODE_ENV",
  ],
  properties: {
    // Server
    JWT_SECRET_KEY: {
      type: "string",
    },
    // Database
    MONGODB_URI: {
      type: "string",
    },
    MONGODB_DB_NAME: {
      type: "string",
    },

    CORS_ORIGIN_URL: {
      type: "string",
    },
    REFRESH_TOKEN_EXPIRES_IN: {
      type: "string",
    },
    ACCESS_TOKEN_EXPIRES_IN: {
      type: "string",
    },
    NODE_ENV: {
      type: "string",
      enum: ["development", "production"],
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
export default fp(
  async (fastify) => {
    fastify.register(env, autoConfig);
  },
  { name: "config" }
);
