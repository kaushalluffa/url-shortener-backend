import UrlMapping from "../../database/models/url-mapping.model.js";

export default async function redirect(
  request,
  reply
) {
  const { short_url } = request.params;
  const longUrl = await UrlMapping.findOne({
    short_url,
  }).select("long_url");

  if (!longUrl || !longUrl.long_url) {
    return reply.code(404).send({ message: "URL not found" });
  }
  await UrlMapping.updateOne(
    { short_url },
    { $inc: { click_count: 1 } }
  );

  reply.code(200).send({ longUrl: longUrl.long_url });
}
