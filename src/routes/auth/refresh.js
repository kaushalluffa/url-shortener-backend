import User from "../../database/models/user.model.js";

export default async function refresh(request, reply) {
  const cookies = request.cookies;
  if (!cookies["refresh_token"]) {
    return reply.code(400).send({ message: "No refresh token found" });
  }
  const refreshTokenFromCookies = cookies["refresh_token"];
  const user = await User.findOne({
    refreshToken: { $elemMatch: { $eq: refreshTokenFromCookies } },
  });
  request.log.info({ userHere: user });
  if (!user) {
    try {
      const decoded = await request.jwtVerify({});
      await User.updateOne(
        {
          user_id: decoded.userId,
        },
        { refreshToken: [] }
      );
      return reply.code(403).send({ message: "Invalid refresh token" });
    } catch (error) {
      return reply.code(403).send({ message: "Invalid token" });
    }
  }
  const newRefreshTokens = user.refreshToken.filter(
    (rt) => rt !== refreshTokenFromCookies
  );
  try {
    const decoded = await new Promise((resolve, reject) => {
      request.server.jwt.verify(refreshTokenFromCookies, (err, decoded) => {
        if (err) reject(err);
        else resolve(decoded);
      });
    });

    const foundUserId = user.user_id.toString();
    if (foundUserId !== decoded.userId) {
      request.log.info({ errorHere: "User ID mismatch" });
      await User.updateOne(
        { user_id: decoded.userId },
        { refreshToken: newRefreshTokens }
      );
      return reply.code(403).send({ message: "Forbidden" });
    }

    const newAccessToken = request.server.jwt.sign(
      { userId: user.user_id },
      { expiresIn: request.server.config.ACCESS_TOKEN_EXPIRES_IN || "15m" }
    );
    const newRefreshToken = request.server.jwt.sign(
      { userId: user.user_id },
      { expiresIn: request.server.config.REFRESH_TOKEN_EXPIRES_IN || "7d" }
    );

    user.refreshToken = [...newRefreshTokens, newRefreshToken];
    await user.save();

    return reply
      .setCookie("refresh_token", newRefreshToken, {
        httpOnly: true,
        secure: request.server.config.NODE_ENV === "production",
        path: "/",
      })
      .code(200)
      .send({ accessToken: newAccessToken, user });
  } catch (error) {
    request.log.info({ errorHere: error });
    await User.updateOne(
      { user_id: user.user_id },
      { refreshToken: newRefreshTokens }
    );
    return reply
      .code(403)
      .send({ message: "Invalid token please login again" });
  }
}
