import AWS from 'aws-sdk';
import  { handlerMiddy } from "../lib/util"
import createError from "http-errors"
import { getAuctionById } from "./getAuction"

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function placeBid(event,context) {
    const {id} = event.pathParameters;
    const {amount} = event.body
    
    const auction = await getAuctionById(id)
  
    if (amount <= auction.highestBid.amount) {
       throw new createError.Forbidden(`You bid ${amount}!\nYour bid must be higher then ${auction.highestBid.amount}`)
   }

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
  