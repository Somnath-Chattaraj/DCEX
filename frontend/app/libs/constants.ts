import { Connection } from "@solana/web3.js";
import axios from "axios";


let LAST_UPDATED: number | null = null;
let prices: { [key: string]: { price: string } } = {};
const TOKEN_PRICE_REFRESH_INTERVAL = 1000 * 60;

export interface TokenDetails {
    name: string;
    mint: string;
    native: boolean;
    price: string;
    images: string[];
}

export const SUPPORTED_TOKENS: TokenDetails[] = [
    {
        name: "USDC",
        mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        native: false,
        price: "1",
        images: [
            "../../public/USDC.webp",
        ],
    },
    {
        name: "USDT",
        mint: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
        native: false,
        price: "1",
        images: [
            "../../public/USDT.webp",
        ],
    },
    {
        name: "SOL",
        mint: "So11111111111111111111111111111111111111112",
        native: true,
        price: "1",
        images: [
            "../../public/SOL.webp",
        ],
    },
];

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
