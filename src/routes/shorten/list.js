import UrlMapping from "../../database/models/url-mapping.model.js";

export const listUrls = async (
  request,
  reply
) => {
  const { page = "1", perPage = "10", search = '' } = request.query;
  const listOfUrlsPromise = UrlMapping.find({
    user_id: request.user.userId,
    ...(search && { long_url: { $regex: search, $options: "i" } }),
  })
    .limit(Number(perPage))
    .skip((Number(page) - 1) * Number(perPage));
  const totalCountPromise = UrlMapping.countDocuments();
  const [listOfUrls, totalCount] = await Promise.all([
    listOfUrlsPromise,
    totalCountPromise,
  ]);
  return reply.code(200).send({ listOfUrls, totalCount });
};
