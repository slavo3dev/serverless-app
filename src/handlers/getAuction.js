import AWS from 'aws-sdk';
import  { handlerMiddy } from "../lib/util"
import createError from "http-errors"

const dynamodb = new AWS.DynamoDB.DocumentClient();


export async function getAuctionById(id) {
  let auction

    try {
      const result = await dynamodb.get({
        TableName: process.env.AUCTIONS_TABLE_NAME,
        Key: { id: id },
      }).promise()
      
      auction = result.Item
  }
  catch (error) {
    console.error(error);
    throw new createError.InternalServerError("ERROR Message: ", error)
  }
    
    if (!auction) {
      throw new createError.NotFound(`Auction with ID: ${id} not found`)
    }
  
  return auction
}

async function getAuction(event,context) {
    const { id } = event.pathParameters;
  
    getAuctionById(id)

  return {
    statusCode: 200,
    body: JSON.stringify(auction)
  };
};

export const handler = handlerMiddy(getAuction)
  