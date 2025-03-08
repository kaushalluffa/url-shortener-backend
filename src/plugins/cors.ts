import cors, { FastifyCorsOptions } from "@fastify/cors";
import fp from "fastify-plugin";

/**
 * This plugins enables the use of CORS.
 *
 * @see {@link https://github.com/fastify/fastify-cors}
 */
export default fp(async (fastify) => {
  const autoConfig: FastifyCorsOptions = {
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    origin: fastify.config.CORS_ORIGIN_URL,
    credentials: true,
  };
  fastify.log.info(autoConfig);
  await fastify.register(cors, autoConfig);
});
