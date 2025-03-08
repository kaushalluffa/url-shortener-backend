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
  const newRefreshToken = request.server.jwt.sign(
    { userId: user.user_id },
    { expiresIn: request.server.config.REFRESH_TOKEN_EXPIRES_IN || "7d" }
  );
  const accessToken = request.server.jwt.sign(
    { userId: user.user_id },
    { expiresIn: request.server.config.ACCESS_TOKEN_EXPIRES_IN || "15m" }
  );
  let refreshTokens = !request.cookies.refresh_token
    ? user.refreshToken
    : user.refreshToken.filter((rt) => rt !== request.cookies.refresh_token);
  if (request.cookies["refresh_token"]) {
    const refreshTokenFromCookie = request.cookies["refresh_token"];
    const foundToken = await User.findOne({
      refreshToken: { $elemMatch: { $eq: refreshTokenFromCookie } },
    });
    if (!foundToken) {
      refreshTokens = [];
    }
    return reply
      .clearCookie("refresh_token", {
        httpOnly: true,
        secure: request.server.config.NODE_ENV === "production",
      })
      .code(400)
      .send({ message: "Unauthorized" });
  }
  user.refreshToken = [...refreshTokens, newRefreshToken];
  await user.save();
  return reply
    .setCookie("refresh_token", newRefreshToken, {
      httpOnly: true,
      secure: request.server.config.NODE_ENV === "production",
    })
    .code(200)
    .send({ accessToken, user });
}
