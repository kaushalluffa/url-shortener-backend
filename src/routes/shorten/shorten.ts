import { FastifyReply, FastifyRequest } from "fastify";
import UrlMapping from "../../database/models/url-mapping.model.js";
import generateUrlShortCode from "../../utils/generateUrlShortCode.js";

export default async function shorten(
  request: FastifyRequest<{
    Body: { long_url: string; custom_alias?: string };
  }>,
  reply: FastifyReply
) {
  const { long_url } = request.body;
  const shortUrlBase62Code = await generateUrlShortCode(long_url);
  const urlMapping = await UrlMapping.create({
    long_url,
    short_url: shortUrlBase62Code,
    click_count: 0,
    user_id: request.user.user_id,
  });
  if (!urlMapping) {
    return reply.code(500).send({ message: "Error generating short url" });
  }
  return reply.code(201).send({
    short_url: shortUrlBase62Code,
    long_url,
    created_at: new Date().toISOString(),
  });
}
