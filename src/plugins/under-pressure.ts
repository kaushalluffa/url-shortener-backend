import { FastifyInstance } from "fastify";
import fastifyUnderPressure from "@fastify/under-pressure";
import fp from "fastify-plugin";

// Define the UnderPressure options type.  This is essential for TypeScript!
interface UnderPressureOptions {
  maxEventLoopDelay: number;
  maxHeapUsedBytes: number;
  maxRssBytes: number;
  maxEventLoopUtilization: number;
  message: string;
  retryAfter: number;
  healthCheck: () => Promise<boolean>;
  healthCheckInterval: number;
  // ... other options as needed
}

export const autoConfig = (fastify: FastifyInstance): UnderPressureOptions => {
  return {
    maxEventLoopDelay:
      fastify.config.UNDER_PRESSURE_MAX_EVENT_LOOP_DELAY || 1000,
    maxHeapUsedBytes: parseInt(
      fastify.config.UNDER_PRESSURE_MAX_HEAP_USED_BYTES || "100000000",
      10
    ), // Parse to number
    maxRssBytes: parseInt(
      fastify.config.UNDER_PRESSURE_MAX_RSS_BYTES || "1000000000",
      10
    ), // Parse to number
    maxEventLoopUtilization: parseFloat(
      fastify.config.UNDER_PRESSURE_MAX_EVENT_LOOP_UTILIZATION || "0.98"
    ), // Parse to float
    message:
      fastify.config.UNDER_PRESSURE_MESSAGE ||
      "The server is under pressure, retry later!",
    retryAfter: parseInt(fastify.config.UNDER_PRESSURE_RETRY_AFTER || "50", 10), // Parse to number
    healthCheck: async () => {
      try {
        // Correct MongoDB health check
        await fastify.mongo.collection(
          fastify.config.MONGODB_HEALTH_CHECK_COLLECTION
        ).findOne({});
        return true;
      } catch (err) {
        fastify.log.error(err, "healthCheck has failed");
        throw new Error("Database connection is not available");
      }
    },
    healthCheckInterval: parseInt(
      fastify.config.UNDER_PRESSURE_HEALTH_CHECK_INTERVAL || "5000",
      10
    ), // Parse to number
    // ... other options from config
  };
};

export default fp(
  async (fastify: FastifyInstance) => {
    const options = autoConfig(fastify);
    await fastify.register(fastifyUnderPressure, options);
  },
  {
    name: "under-pressure",
    dependencies: ["@fastify/env", "mongodb"], // Correct dependencies
  }
);
