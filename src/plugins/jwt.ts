import fastifyCookie from "@fastify/cookie";
import fastifyJwt from "@fastify/jwt";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fp from 'fastify-plugin';

export default fp(async (fastify: FastifyInstance) => {
  const jwtSecret = process.env.JWT_SECRET_KEY;
  const cookieSecret = process.env.COOKIE_SECRET;

  if (!jwtSecret) throw new Error("JWT_SECRET_KEY is not defined");
  if (!cookieSecret) throw new Error("COOKIE_SECRET_KEY is not defined");

  fastify.register(fastifyJwt, { secret: jwtSecret });
  fastify.register(fastifyCookie, { secret: cookieSecret });
  fastify.decorate(
    "authenticate",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { jwt, log } = fastify;
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
}, { name: "jwt" });