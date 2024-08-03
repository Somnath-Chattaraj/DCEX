"use server";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import ProfileCard from "../components/ProfileCard";
import db from "@/app/db";
import { getServerSession } from "next-auth";
import { authConfig } from "../libs/auth";


async function getUserWallet() {

    const session = await getServerSession(authConfig);

    const userWallet = await db.solWallet.findFirst({
        where: {
            // @ts-ignore
            userId: session?.user?.uid
        },
        select: {
            publicKey: true
        }
    })

    if (!userWallet) {
        return {
            error: "NO solana wallet found asscociated with this account"
        }
    }
    // db.solWallet.findUnique({
    //     where: {
    //         userId: session?.user?.uid
    //     }
    // })
    return {error: null, userWallet};
}

export default async function Dashboard() {
    const userWallet = await getUserWallet();
    if (userWallet.error || !userWallet.userWallet?.publicKey) {
        return (
            <>
                No solana wallet found
            </>
        )
    }
    return (
        <div>
            <ProfileCard publicKey={userWallet.userWallet?.publicKey} />
        </div>
    )
}