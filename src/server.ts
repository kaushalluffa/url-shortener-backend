import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { config } from "dotenv";
import Fastify from "fastify";
import fastifyPlugin from "fastify-plugin";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import cors from "./plugins/cors.js";
import jwtPlugin from "./plugins/jwt.js";
import swagger from "./plugins/swagger.js";
import mongodbConnector from "./plugins/mongodb.js";
import fastifyAutoload from "@fastify/autoload";
function getLoggerOptions() {
  if (process.stdout.isTTY) {
    return {
      level: "info",
      transport: {
        target: "pino-pretty",
        options: {
          translateTime: "HH:MM:ss Z",
          ignore: "pid,hostname",
        },
      },
    };
  }
  return { level: "silent" };
}

config();
const fastify = Fastify({
  logger: getLoggerOptions(),
}).withTypeProvider<TypeBoxTypeProvider>();
async function init() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  await fastify.register(cors);
  await fastify.register(fastifyPlugin(mongodbConnector));
  await fastify.register(jwtPlugin);
  await fastify.register(swagger);

  // This loads all plugins defined in routes
  // define your routes in one of these

  fastify.register(fastifyAutoload, {
    dir: join(__dirname, "./routes"),
    autoHooks: true,
    cascadeHooks: true,
    options: { prefix: "/api/v1" },
  });

  fastify.setErrorHandler((err, request, reply) => {
    fastify.log.error(
      {
        err,
        request: {
          method: request.method,
          url: request.url,
          query: request.query,
          params: request.params,
        },
      },
      "Unhandled error occurred"
    );

    reply.code(err.statusCode ?? 500);

    let message = "Internal Server Error";
    if (err.statusCode && err.statusCode < 500) {
      message = err.message;
    }

    return { message };
  });

  // An attacker could search for valid URLs if your 404 error handling is not rate limited.
  fastify.setNotFoundHandler((request, reply) => {
    request.log.warn(
      {
        request: {
          method: request.method,
          url: request.url,
          query: request.query,
          params: request.params,
        },
      },
      "Resource not found"
    );

    reply.code(404);

    return { message: "Not Found" };
  });
  try {
    // Start listening.
    await fastify.listen({ port: process.env.PORT ?? 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

init();
