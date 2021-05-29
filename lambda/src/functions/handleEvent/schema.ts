export default {
  type: "array",
  items: {
    type: "object",
    properties: {
      log_id: {
        type: "string",
      },
      data: {
        type: "object",
        properties: {
          type: {
            type: "string",
          },
        },
      },
    },
    required: ["log_id", "data"],
  },
} as const;
