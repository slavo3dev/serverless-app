import AWS from 'aws-sdk';
import  { handlerMiddy } from "../lib/util"
import createError from "http-errors"

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function placeBid(event,context) {
    const {id} = event.pathParameters;
    const { amount } = event.body
  
    const params = {
        TableName: process.env.AUCTIONS_TABLE_NAME,
        Key: {id},
        UpdateExpression: 'set highestBid.amount = :amount',
        ExpressionAttributeValues: {
            ":amount": amount
        },
        ReturnValues: "ALL_NEW"
    }

    let updateAuction;
    
    try {
       
        const result = await dynamodb.update(params).promise()
        updateAuction = result.Attributes
        
    } catch (error) {
        console.error(error);
        throw new createError.InternalServerError(error);
    }


  return {
    statusCode: 200,
    body: JSON.stringify(updateAuction)
  };
};

export const handler = handlerMiddy(placeBid)
  