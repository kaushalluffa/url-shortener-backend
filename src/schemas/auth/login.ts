import { email, password } from "../common.js";

const loginResponseProperties = {
  accessToken: { type: "string" },
};
export const loginSchema = {
  body: {
    type: "object",
    properties: {
      email,
      password,
    },
    required: ["email", "password"],
  },
  response: {
    200: {
      type: "object",
      properties: loginResponseProperties,
    },
    500: {
      type: "object",
      properties: loginResponseProperties,
    },
    400: {
      type: "object",
      properties: loginResponseProperties,
    },
  },
};
