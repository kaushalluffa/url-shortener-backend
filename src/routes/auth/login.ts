import { FastifyReply, FastifyRequest } from "fastify";
import User from "../../database/models/user.model.js";
import bcrypt from "bcrypt";

export default async function login(
  request: FastifyRequest<{ Body: { email: string; password: string } }>,
  reply: FastifyReply
) {
  const fastifyInstance = request.server;
  const { jwt } = fastifyInstance;
  const { email, password } = request.body;
  const user = await User.findOne({ email });
  if (!user) {
    return reply.code(400).send({ message: "User not found" });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return reply.code(400).send({ message: "Invalid password" });
  }
  const refreshToken = jwt?.sign({ userId: user._id });
  const accessToken = jwt?.sign({ userId: user._id });
  return reply
    .headers({
      "set-cookie": `refresh_token=${refreshToken}; HttpOnly; Secure; Path=/; SameSite=Strict`,
    })
    .code(200)
    .send({ accessToken });
}
