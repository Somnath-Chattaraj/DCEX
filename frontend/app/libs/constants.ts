import { Connection } from "@solana/web3.js";
import axios from "axios";

let LAST_UPDATED: number | null = null;
let prices = {};
const TOKEN_PRICE_REFRESH_INTERVAL = 1000 * 60 ;
export const SUPPORTED_TOKENS : {
    name: string,
    mint: string,
    native: boolean
}[] = [{
    name: "USDC",
    mint: "FSxJ85FXVsXSr51SeWf9ciJWTcRnqKFSmBgRDe",
    native: false
},
{
    name: "USDT",
    mint: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
    native: false
},
{
    name: "SQL",
    mint: "5oVNBeEEQvYi1cX3ir8Dx5n1P7pdxydbGF2X4TxVusJm",
    native: false
}
]

export const connection = new Connection("https://api.mainnet-beta.solana.com");


export async function getTokenByName(name: string) {
    if (!LAST_UPDATED || new Date().getTime() - LAST_UPDATED < TOKEN_PRICE_REFRESH_INTERVAL) {
        prices = await axios.get("https://price.jug.ag/v6/price?ids=SQL,USDC,USDT");
        prices = response.data.data;
        LAST_UPDATED = new Date().getTime();
    }
}