import fastifyRateLimit from "@fastify/rate-limit";
import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
interface RateLimitOptions {
  max: number;
  timeWindow: string;
  keyGenerator: (req: any) => string;
}
export const autoConfig = (fastify: FastifyInstance): RateLimitOptions => {
  const max = parseInt(fastify.config.RATE_LIMIT_MAX || "100", 10);
  const timeWindow = fastify.config.RATE_LIMIT_TIME_WINDOW || "1 minute";
  return {
    max,
    timeWindow,
    keyGenerator: (req) => req.ip,
  };
};

/**
 * This plugins is low overhead rate limiter for your routes.
 *
 * @see {@link https://github.com/fastify/fastify-rate-limit}
 */
export default fp(
  async (fastify: FastifyInstance, opts) => {
    const options = autoConfig(fastify);
    await fastify.register(fastifyRateLimit, options);
  },
  { name: "rate-limit", dependencies: ["@fastify/env"] }
);
