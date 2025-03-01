import { FastifyReply, FastifyRequest } from "fastify";
import User from "../../database/models/user.model.js";
import bcrypt from "bcrypt";

export default async function login(
  request: FastifyRequest<{ Body: { email: string; password: string } }>,
  reply: FastifyReply
) {
  const { email, password } = request.body;

  const user = await User.findOne({ email });
  if (!user) {
    return reply.code(400).send({ message: "User not found" });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return reply.code(400).send({ message: "Invalid password" });
  }
  const refreshToken = request.jwt.sign({ userId: user._id });
  const accessToken = request.jwt.sign({ userId: user._id });
  return reply
    .setCookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    })
    .code(200)
    .send({ accessToken });
}
