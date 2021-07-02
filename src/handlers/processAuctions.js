import { getEnedAuctions, closeAuction } from "../lib/util"
import createError from "http-errors"
async function processAuctions(event,context) {
    

    try {
         const auctionsToClose = await getEnedAuctions();
         const closePromises = auctionsToClose.map(auction => closeAuction(auction.id))
         await Promise.all(closePromises)
        
        return { closed: closePromises.length }

    } catch (err) {
        console.error("Error: ",err);
        throw new createError.InternalServerError(err) 
    }
     
}

export const handler = processAuctions