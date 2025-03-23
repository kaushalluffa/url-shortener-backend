import { loginSchema } from "../../schemas/auth/login.js";
import { registerSchema } from "../../schemas/auth/register.js";
import login from "./login.js";
import logout from "./logout.js";
import refresh from "./refresh.js";
import register from "./register.js";

export default async function authRoutes(fastify) {
  fastify.post("/register", { schema: registerSchema }, register);
  fastify.post("/login", { schema: loginSchema }, login);
  fastify.get("/logout", logout);
  fastify.get("/refresh", refresh);
}
