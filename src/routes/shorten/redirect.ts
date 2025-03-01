import { FastifyReply, FastifyRequest } from "fastify";
import UrlMapping from "../../database/models/url-mapping.model.js";

export default async function redirect(
  request: FastifyRequest<{ Params: { short_url: string } }>,
  reply: FastifyReply
) {
  const { short_url } = request.params;
  const longUrl = await UrlMapping.findOne({
    short_url,
  }).select("long_url");

  if (!longUrl || !longUrl.long_url) {
    return reply.code(404).send({ message: "URL not found" });
  }
  reply.redirect(longUrl.long_url, 301);
}
