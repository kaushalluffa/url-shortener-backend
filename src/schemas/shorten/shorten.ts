const shortenResponseProperties = {
  message: { type: "string" },
};
export const shortenSchema = {
  body: {
    type: "object",
    properties: {
      long_url: { type: "string" },
    },
    required: ["long_url"],
  },
  response: {
    201: {
      type: "object",
      properties: {
        ...shortenResponseProperties,
        short_url: { type: "string" },
        long_url: { type: "string" },
        created_at: { type: "string" },
      },
    },
    500: {
      type: "object",
      properties: shortenResponseProperties,
    },
  },
};
