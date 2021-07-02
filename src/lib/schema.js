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
              }    
          }
        },
      required: ['title']
    },
  required: ['body']
}

export const placeBidSchema = {
    properties: {
        body: {
          type: "object",
            properties: {
              amount: {
                type: number,
              }    
          }
        },
      required: ['amount']
    },
  required: ['body']
}