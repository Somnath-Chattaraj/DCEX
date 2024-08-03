import { SUPPORTED_TOKENS, connection } from "@/app/libs/constants";
import { getAccount, getAssociatedTokenAddress } from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const {searchParams} = new URL(req.url);
    const address = searchParams.get('address') as unknown as string;
    const balances = await Promise.all(SUPPORTED_TOKENS.map((token)=> getAccountBalance(token, address)));
}


async function getAccountBalance(token: {
    name: string;
    mint: string;
}, address: string) {
    const ata = await getAssociatedTokenAddress(new PublicKey(token.mint), new PublicKey(address));
    const account = await getAccount(connection, ata);
}

