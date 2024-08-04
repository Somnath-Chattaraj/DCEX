import { Connection } from "@solana/web3.js";
import axios from "axios";
import { SUPPORTED_TOKENS } from "./token";


let LAST_UPDATED: number | null = null;
let prices: { [key: string]: { price: string } } = {};
const TOKEN_PRICE_REFRESH_INTERVAL = 1000 * 60;





// export const connection = new Connection(`https://solana-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`);
// export const connection = new Connection(`https://solana-mainnet.g.alchemy.com/v2/EspGgEsKtp6xdG1-P32lj9raEFUlgXNc`);
export const connection = new Connection("https://api.mainnet-beta.solana.com");

export async function getSupportedTokens() {
    const now = new Date().getTime();
    if (!LAST_UPDATED || now - LAST_UPDATED >= TOKEN_PRICE_REFRESH_INTERVAL) {
        try {
            const response = await axios.get("https://price.jug.ag/v6/price?ids=SOL,USDC,USDT");
            prices = response.data.data;
            LAST_UPDATED = now;
        } catch (e) {
            console.error(e);
        }
    }

    return SUPPORTED_TOKENS.map((s) => ({
        ...s,
        price: prices[s.name]?.price || s.price,
    }));
}

(async () => {
    const tokens = await getSupportedTokens();
    console.log(tokens);
})();
