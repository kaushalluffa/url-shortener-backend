const redirectResponseProperties = {
  message: { type: "string" },
};
export const redirectSchema = {
  params: {
    type: "object",
    properties: {
      short_url: { type: "string" },
    },
    required: ["short_url"],
  },
  response: {
    404: {
      type: "object",
      properties: {
        ...redirectResponseProperties,
        short_url: { type: "string" },
        long_url: { type: "string" },
        created_at: { type: "string" },
      },
    }
  },
};
