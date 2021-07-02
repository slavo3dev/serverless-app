import { getEnedAuctions } from "../lib/util"

async function processAuctions(event,context) {
    
    const auctionsToClose = await getEnedAuctions();
    console.log("Auctions to Close", auctionsToClose)

    
}

export const handler = processAuctions