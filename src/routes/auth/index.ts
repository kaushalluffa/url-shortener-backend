import { FastifyInstance } from "fastify";
import register from "./register.js";
import login from "./login.js";
import logout from "./logout.js";
import { registerSchema } from "../../schemas/auth/register.js";
import { loginSchema } from "../../schemas/auth/login.js";

export default async function authRoutes(fastify: FastifyInstance) {
  fastify.post("/register", { schema: registerSchema }, register);
  fastify.post("/login", { schema: loginSchema }, login);
  fastify.get("/logout", logout);
}
