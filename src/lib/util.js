import AWS from "aws-sdk"
import httpJsonBodyParser from "@middy/http-json-body-parser"
import httpEventNormalizer from '@middy/http-event-normalizer';
import httpErrorHandler from '@middy/http-error-handler';
import middy from "@middy/core";

const dynamodb = new AWS.DynamoDB.DocumentClient()


export const handlerMiddy = (handler) => middy(handler).use([httpErrorHandler() ,httpJsonBodyParser() ,httpEventNormalizer()])


export const getEnedAuctions = async () => {
  const now = new Date();
  const params = {
    TableName: process.env.AUCTIONS_TABLE_NAME,
    IndexName: 'statusAndEndDate',
    KeyConditionExpression: '#status = :status AND endingAt <= :now',
    ExpressionAttributeValues: {
      ':status': 'OPEN',
      ':now': now.toISOString(),
    },
    ExpressionAttributeNames: {
      '#status': 'status',
    },
  };

  const result = await dynamodb.query(params).promise();
  return result.Items;
   
}

export const closeAuction = async (auction) => {
  const params = {
    TableName: process.env.AUCTIONS_TABLE_NAME,
    Key: { id: auction.id },
    UpdateExpression: 'set #status = :status',
    ExpressionAttributeValues: {
      ':status': 'CLOSED',
    },
    ExpressionAttributeNames: {
      '#status': 'status',
    },
  };

  const result = await dynamodb.update(params).promise();
  return result;
}
