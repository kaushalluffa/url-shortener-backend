import env from "@fastify/env";

declare module "fastify" {
  export interface FastifyInstance {
    config: {
      PORT: number;
      MONGODB_URI: string;
      MONGODB_DB_NAME: string;
      MONGODB_HEALTH_CHECK_COLLECTION: string;
      JWT_SECRET_KEY: string;
    };
  }
}

const schema = {
  type: "object",
  required: [
    "MONGODB_URI",
    "MONGODB_DB_NAME",
    "JWT_SECRET_KEY",
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
