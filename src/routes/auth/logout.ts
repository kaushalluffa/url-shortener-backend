import { FastifyReply, FastifyRequest } from "fastify";

export default async function logout(
  request: FastifyRequest,
  reply: FastifyReply
) {
  return reply
    .clearCookie("refresh_token")
    .send({ message: "Logged out successfully" });
}
