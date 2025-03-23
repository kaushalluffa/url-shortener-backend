
export default async function logout(
  request,
  reply
) {
  return reply
    .clearCookie("refresh_token")
    .send({ message: "Logged out successfully" });
}
