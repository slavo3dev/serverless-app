import AWS from 'aws-sdk';
import handlerMiddy from "../lib/util"
import createError from "http-errors"

const dynamoDb = new AWS.DynamoDB.DocumentClient();

async function getAuctions(event,context) {
  let auctions;
  
  try {
    const result = await dynamoDb.scan({
      TableName: process.env.AUCTIONS_TABLE_NAME,
    }).promise()

    auctions = result.Items
  }
  catch (error) {
    console.error(error);
    throw new createError.InternalServerError("ERROR Message: ", error)
  }

  return {
    statusCode: 200,
    body: JSON.stringify(auctions)
  };
};

export const handler = handlerMiddy(getAuctions)
 