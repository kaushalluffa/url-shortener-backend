import { FastifyInstance } from "fastify";
import shorten from "./shorten.js";
import redirect from "./redirect.js";
import { shortenSchema } from "../../schemas/shorten/shorten.js";
import { redirectSchema } from "../../schemas/shorten/redirect.js";
import { listUrls } from "./list.js";

export default async function shortenRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/create-short-url",
    { onRequest: [fastify.authenticate], schema: shortenSchema },
    shorten
  );
  fastify.get(
    "/list-urls",
    {
      onRequest: [fastify.authenticate],
      schema: {
        querystring: {
          type: "object",
          properties: {
            page: { type: "string" },
            perPage: { type: "string" },
            search: { type: "string" }
          },
        },
      },
    },
    listUrls
  );
  fastify.get("/redirect/:short_url", { schema: redirectSchema }, redirect);
}
