import fastifyCookie from "@fastify/cookie";
import fastifyJwt from "@fastify/jwt";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export default async function jwtPlugin(fastify: FastifyInstance) {
  fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET_KEY!,
  });
  fastify.register(fastifyCookie, {
    secret: process.env.COOKIE_SECRET_KEY!,
    hook: "preHandler",
  });
  fastify.decorate(
    "authenticate",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const fastifyInstance = request.server;
      const { jwt, log } = fastifyInstance;
      try {
        const { refresh_token } = request.cookies;
        if (!refresh_token) {
          throw new Error("No refresh token found");
        }
        jwt.verify(refresh_token);
        await request.jwtVerify();
      } catch (error: any) {
        log.error(error);
        reply
          .code(401)
          .header("Content-type", "application/json; charset=utf-8")
          .send({ statusCode: 401, message: error.message });
      }
    }
  );
}
