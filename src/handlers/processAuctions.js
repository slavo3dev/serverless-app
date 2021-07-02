import { getEnedAuctions, closeAuction } from "../lib/util"

async function processAuctions(event,context) {
    
    const auctionsToClose = await getEnedAuctions();
    const closePromises = auctionsToClose.map(auction => closeAuction(auction.id))
    await Promise.all(closePromises)  
}

export const handler = processAuctions