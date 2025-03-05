import fastifyAutoload from "@fastify/autoload";
import { JWT } from "@fastify/jwt";
import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
declare module "fastify" {
  export interface FastifyRequest {
    jwt: JWT;
  }
  export interface FastifyInstance {
    authenticate: any;
  }
}
declare module "@fastify/jwt" {
  interface FastifyJWT {
    user: {
      user_id: string;
      email: string;
      name: string;
    };
  }
}
export default async function serviceApp(
  fastify: FastifyInstance,
  opts: FastifyPluginOptions
) {
  delete opts.skipOverride; // This option only serves testing purpose
  // Register plugins
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  // This loads all external plugins defined in plugins/external
  // those should be registered first as your custom plugins might depend on them
  await fastify.register(fastifyAutoload, {
    dir: join(__dirname, "./plugins"),
    options: { ...opts },
  });

  // This loads all plugins defined in routes
  // define your routes in one of these

  fastify.register(fastifyAutoload, {
    dir: join(__dirname, "./routes"),
    autoHooks: true,
    cascadeHooks: true,
    options: { ...opts, prefix: "/api/v1" },
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
}
