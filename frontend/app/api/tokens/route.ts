import { connection, getSupportedTokens } from "@/app/libs/constants";
import { SUPPORTED_TOKENS } from "@/app/libs/token";
import { getAccount, getAssociatedTokenAddress, getMint } from "@solana/spl-token";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const {searchParams} = new URL(req.url);
    const address = searchParams.get('address') as unknown as string;
    const supportedTokens = await getSupportedTokens();
    const balances = await Promise.all(SUPPORTED_TOKENS.map((token)=> getAccountBalance(token, address)));


    const tokens = supportedTokens.map((token:any, index:any) => ({
        ...token,
        balance: balances[index].toFixed(2),
        usdBalance: (balances[index] * Number(token.price)).toFixed
    }))
    return NextResponse.json({
        tokens,
        totalBalance: tokens.reduce((acc:any, val:any) => acc + Number(val.usdBalance), 0).toFixed(2)
    })
}


async function getAccountBalance(token: {
    name: string;
    mint: string;
    native: boolean;
}, address: string) {
    if (token.native) {
        let balance = await connection.getBalance(new PublicKey(address));
        return balance / LAMPORTS_PER_SOL;
    }
    const ata = await getAssociatedTokenAddress(new PublicKey(token.mint), new PublicKey(address));
    try {

        const account = await getAccount(connection, ata);
        const mint = await getMint(connection, new PublicKey(token.mint));
        return Number(account.amount) / (10 ** mint.decimals);
    } catch (e) {
        return 0;
    }
}

