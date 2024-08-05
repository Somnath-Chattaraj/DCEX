"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { TokenWithBalance, useTokens } from "../api/hooks/useTokens";
import { TokenList } from "./TokenList";
import { type } from "os";
import { TabButton } from "./Button";
import { Swap } from "./Swap";


type Tab = "Tokens" | "Send" | "Add Funds" | "Withdraw" | "Swap";
const tabs: {id:Tab, name: String}[] =[
    {id: "Tokens", name: "Tokens"},
    {id: "Send", name: "Send"},
    {id: "Add Funds", name: "Add Funds"},
    {id: "Withdraw", name: "Withdraw"},
    {id: "Swap", name: "Swap"},
]
export default function ProfileCard({publicKey}: {
    publicKey: string
}) {
    const session = useSession();
const [selectedTab, setSelectedTab] = useState<Tab>("Tokens");
const {tokenBalances, loading} = useTokens(publicKey);
    // const router = useRouter();
    if (session.status === "loading") {
        return (
            <div className="flex flex-col items-center justify-center w-full h-full ">
                Loading....
            </div>
        )
    }



    if (!session.data?.user) {
        // router.push("/");
        return null;
    }

    return (
        <div className="flex flex-col items-center pt-20 bg-blue-100 w-full h-full p-10">

        <div className="items-center justify-center bg-white shadow-2xl rounded-lg p-5">
            <div className="flex flex-cols py-4">
                {session.data?.user?.image && (
                    <div className="flex">   

                    <div className="flex">

                    <img
                        src={session.data?.user?.image}
                        alt="user"
                        className="w-10 h-10 rounded-full"
                        />
                    </div>
                    <div className="pt-2 pl-3 text-xl font-bold">Welcome back, {session.data?.user?.name}!</div>
                    </div>
                )}
            </div>
            <div className="text-gray-400 py-2 text-sm">TipLink Account Assets</div>
            {/* <Assets publicKey={publicKey} /> */}
            <div className="flex justify-between pt-6 mx-2">

            {
                tabs.map(tab => <TabButton onClick={() => setSelectedTab(tab.id)}  active={tab.id === selectedTab}>{tab.name}</TabButton>)
            }
            </div>
            <div className={`${selectedTab === "Tokens" ? "visible" : "hidden"} flex py-5 justify-between`}>
                <Assets publicKey={publicKey} tokenBalances={tokenBalances} loading={loading} /> 
            </div>
            <div className={`${selectedTab === "Swap" ? "visible" : "hidden"} flex py-5 justify-between`}>
                <Swap publicKey={publicKey} tokenBalances={tokenBalances} loading={loading}/> 
            </div>
            {/* <div className="flex py-5 justify-between">
                <button className="bg-blue-600 text-white rounded-md py-2 px-16 ">Send</button>
                <button className="hover:bg-blue-300 bg-blue-200 text-blue-700 rounded-md py-2 px-16 ml-2">Add Funds</button>
                <button className="hover:bg-blue-300 bg-blue-200 text-blue-700 rounded-md py-2 px-16 ml-2">Withdraw</button>
                <button className="hover:bg-blue-300 bg-blue-200 text-blue-700 rounded-md py-2 px-16 ml-2">Swap</button>
            </div>
            // <Assets publicKey={publicKey} /> */}
        </div>
        </div>
    )
}

function Assets({publicKey, tokenBalances, loading}: {
    publicKey: string,
    tokenBalances:{
        totalBalance: number,
        tokens: TokenWithBalance[]
    } | null,
    loading: boolean,
}) {

    const [copied, setCopied] = useState(false);
    
    useEffect(() => {
        let timeout = setTimeout(() => {
            setCopied(false);
        }, 3000);
        return() => {
            clearTimeout(timeout);
        }
    }, [copied])

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center w-full h-screen ">
                Loading....
            </div>
        )
    }
    return (
        <div className={`text-slate-400 w-full`}>
            Account Assets
            <br />
            <div className="flex justify-between pt-2 m-12">
            <div className="flex justify-between w-full">
                <div className="text-5xl font-bold flex">${tokenBalances?.totalBalance || 0.00} <p className="text-gray-500 text-2xl font-bold pt-4 pl-1">USD</p></div>
                {/* <div className="bg-gray-300 rounded-full text-gray-500 h-10 text-sm items-center px-3 pt-2">Your Wallet Balance</div> */}
                <div onClick={() => {
                    navigator.clipboard.writeText(publicKey);
                    setCopied(true);
                    
                    }} className="bg-gray-300 rounded-full text-gray-500 cursor-pointer mr-0 h-11 text-sm items-center px-3 pt-3">{copied ? "Copied" :"Your Wallet Balance"}</div>
                </div>
            </div>

            <div className="pt-7 rounded-lg bg-slate-50 w-full p-12">
                <TokenList tokens={tokenBalances?.tokens || []} />
            </div>
        </div>
    )
}