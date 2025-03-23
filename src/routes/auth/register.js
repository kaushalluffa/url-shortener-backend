import bcrypt from "bcrypt";
import User from "../../database/models/user.model.js";

export default async function register(
  request,
  reply
) {
  const { email, password, name } = request.body;
  const existingUser = await User.findOne({
    email,
  });
  if (existingUser) {
    return reply.code(400).send({ message: "User already exists" });
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ email, password: hashPassword, name });
  if (newUser) {
    return reply.code(201).send({ message: "User created successfully" });
  }
  return reply.code(500).send({ message: "Internal server error" });
}
