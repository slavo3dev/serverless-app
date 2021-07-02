import AWS from 'aws-sdk';
import validator from "@middy/validator"
import  { handlerMiddy, getAuctionsSchema } from "../lib/util"
import createError from "http-errors"

const dynamoDb = new AWS.DynamoDB.DocumentClient();

async function getAuctions(event,context) {
  let auctions;
  const {status} = event.queryStringParameters;
  
  const params = {
    TableName: process.env.AUCTIONS_TABLE_NAME,
    IndexName: 'statusAndEndDate',
    KeyConditionExpression: '#status = :status',
     ExpressionAttributeValues: {
      ':status': status,
    },
    ExpressionAttributeNames: {
      '#status': 'status',
    },
  }
  
  try {
    const result = await dynamoDb.query(params).promise()

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

export const handler = handlerMiddy(getAuctions).use(
      validator({
        inputSchema: getAuctionsSchema,
        ajvOptions: {
          useDefaults: true,
          strict: false,
        },
      })
    );
 