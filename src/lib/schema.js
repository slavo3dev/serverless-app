export const getAuctionsSchema = {
  type: "object",
  properties: {
    queryStringParameters: {
      type: "object",
      properties: {
        status: {
          type: "string",
          enum: ["OPEN","CLOSED"],
          default: "OPEN"
        }
      }
     }
  },
  required: ["queryStringParameter"]
}

export const createAuctionShema = {
  properties: {
        body: {
          type: "object",
            properties: {
              title: {
                type: "string",
                enum: ["OPEN","CLOSED"],
                default: "OPEN"
              }    
          }
        },
      required: ['title']
    },
  required: ['body']
}