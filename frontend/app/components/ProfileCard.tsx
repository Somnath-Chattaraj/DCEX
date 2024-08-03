"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function ProfileCard({publicKey}: {
    publicKey: string
}) {
    const session = useSession();
    // const router = useRouter();
    if (session.status === "loading") {
        return (
            <div className="flex flex-col items-center justify-center w-full h-screen ">
                Loading....
            </div>
        )
    }

    if (!session.data?.user) {
        // router.push("/");
        return null;
    }

    return (
        <div className="flex flex-col items-center pt-20 bg-blue-100 w-full h-screen ">

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
            <div className="flex justify-between">
                <div className="text-5xl font-bold flex">$0.00 <p className="text-gray-500 text-2xl font-bold pt-4 pl-1">USD</p></div>
                <div className="bg-gray-300 rounded-full text-gray-500 h-10 text-sm items-center px-3 pt-2">Your Wallet Balance</div>
            </div>
            <div className="flex py-5 justify-between">
                <button className="bg-blue-600 text-white rounded-md py-2 px-16 ">Send</button>
                <button className="hover:bg-blue-300 bg-blue-200 text-blue-700 rounded-md py-2 px-16 ml-2">Add Funds</button>
                <button className="hover:bg-blue-300 bg-blue-200 text-blue-700 rounded-md py-2 px-16 ml-2">Withdraw</button>
                <button className="hover:bg-blue-300 bg-blue-200 text-blue-700 rounded-md py-2 px-16 ml-2">Swap</button>
            </div>
            <Assets publicKey={publicKey} />
        </div>
        </div>
    )
}

function Assets({publicKey}: {
    publicKey: string
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
    return (
        <div className="text-slate-400">
            Account Assets
            <br />
            <div className="flex justify-between">
                <div></div>
                <div onClick={() => {
                    navigator.clipboard.writeText(publicKey);
                    setCopied(true);
                
                }} className="bg-gray-300 rounded-full text-gray-500 h-10 text-sm items-center px-3 pt-2">{copied ? "Copied" :"Your Wallet Balance"}</div>
            </div>
        </div>
    )
}