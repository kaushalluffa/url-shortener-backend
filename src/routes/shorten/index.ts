import { FastifyInstance } from "fastify";
import shorten from "./shorten.js";
import redirect from "./redirect.js";
import { shortenSchema } from "../../schemas/shorten/shorten.js";
import { redirectSchema } from "../../schemas/shorten/redirect.js";

export default async function shortenRoutes(fastify: FastifyInstance) {
  fastify.post("/shorten", { schema: shortenSchema }, shorten);
  fastify.get("/:short_url", { schema: redirectSchema }, redirect);
}
