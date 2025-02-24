import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";
import { MongoClient, Db } from "mongodb";
import mongoose from "mongoose";
declare module "fastify" {
  export interface FastifyInstance {
    mongo: Db;
    mongoose: typeof mongoose;
  }
}

export const mongoConfig = (fastify: FastifyInstance) => {
  const uri = fastify.config.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not defined");
  }
  return uri;
};
export default fp(
  async (fastify: FastifyInstance, opts) => {
    const uri = mongoConfig(fastify);
    try {
      const client = new MongoClient(uri);
      await client.connect();
      const dbName = fastify.config.MONGODB_DB_NAME || "defaultDbName";
      const db = client.db(dbName);
      fastify.decorate("mongo", db);
      await mongoose.connect(uri, {
        dbName: dbName,
      });
      fastify.decorate("mongoose", mongoose);
      fastify.addHook("onClose", async (instance) => {
        await client.close();
        await mongoose.connection.close();
      });
      fastify.log.info("Connected to MongoDB and Mongoose");
    } catch (error) {
      fastify.log.error(error);
      throw error;
    }
  },
  { name: "mongodb" }
);
