import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import closeWithGrace from "close-with-grace";
import fastify from "fastify";
import fp from "fastify-plugin";
import serviceApp from "./app.js";

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

const server = fastify({
  logger: getLoggerOptions(),
  ajv: {
    customOptions: {
      coerceTypes: "array", // change type of data to match type keyword
      removeAdditional: "all", // Remove additional body properties
    },
  },
}).withTypeProvider<TypeBoxTypeProvider>();

async function init() {
  // Register your application as a normal plugin.
  // fp must be used to override default error handler
  server.register(fp(serviceApp));

  // Delay is the number of milliseconds for the graceful close to finish
  closeWithGrace(
    { delay: process.env.FASTIFY_CLOSE_GRACE_DELAY ?? 500 },
    async ({ err }) => {
      if (err != null) {
        server.log.error(err);
      }

      await server.close();
    }
  );

  await server.ready();

  try {
    // Start listening.
    await server.listen({ port: process.env.PORT ?? 3000 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

init();
