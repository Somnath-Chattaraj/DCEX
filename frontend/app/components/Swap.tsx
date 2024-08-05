"use client";
import { ReactNode, use, useEffect, useState } from "react";
import { SUPPORTED_TOKENS, TokenDetails } from "@/app/libs/token";
import { DEFAULT_MAX_VERSION } from "tls";
import { TokenWithBalance } from "../api/hooks/useTokens";
import { PrimaryButton } from "./Button";

export const Swap = ({publicKey ,tokenBalances, loading}:{
    publicKey: string
    tokenBalances:{
        totalBalance: number,
        tokens: TokenWithBalance[]
    } | null,
    loading: boolean,
}) => {
    const [baseAssest, setBaseAsset] = useState(SUPPORTED_TOKENS[0]);
    const [quoteAsset, setQuoteAsset] = useState(SUPPORTED_TOKENS[1]);
    const [baseAmount, setBaseAmount] = useState<string>();
    const [quoteAmount, setQuoteAmount] = useState<string>();

    useEffect(() => {
        if (baseAmount) {
            return;
        }
    }, [baseAmount, baseAssest, quoteAsset])
    return (
        <div className="w-full pr-5">
            <div className="text-3xl font-bold ml-4 pb-4 w-full">
                <span className=" w-full">Swap Token</span>
            
            </div>
            <div className="flex flex-col ">
                <div className="my-4">

            <SwapInputRow amount={baseAmount} onAmountChange={(value: string) => {
                setBaseAmount(value)
            }} onSelect={(asset) => {
                setBaseAsset(asset);
            }} selectedToken={baseAssest} title={"You Pay"} topBorderEnabled={true} bottomBorderEnabled={true} subTitle={<div className="text-slate-600 text-sm  pt-1">Current Balance: {tokenBalances?.tokens.find(x => x.name === baseAssest.name)?.balance || 0.00} {baseAssest.name}</div>}/>
            </div>
            <div className="flex justify-center">
                <div className="cursor-pointer rounded-full w-14 h-14 border absolute mt-[-34px] bg-white">
                    <div onClick={() => {
                        let baseAssestTemp = baseAssest;;
                        setBaseAsset(quoteAsset);
                        setQuoteAsset(baseAssestTemp);
                    }} className="flex justify-center items-center pt-3">
                        <SwapIcon />
                    </div>

                </div>

            </div>
            <SwapInputRow amount={quoteAmount} onSelect={(asset) => {
                setBaseAsset(asset);
                }} selectedToken={quoteAsset} title={"You Receive"} topBorderEnabled={true} bottomBorderEnabled={true} subTitle={<div className="text-slate-600 text-sm  pt-1">Current Balance: {tokenBalances?.tokens.find(x => x.name === baseAssest.name)?.balance || 0.00} {baseAssest.name}</div>}/>
            </div>
            <div className="flex justify-end mt-4">

            <PrimaryButton  onClick={() => {
                console.log("swap")
            }}>Swap</PrimaryButton>
            </div>
        </div>



    )
}

function SwapIcon() {
    return(
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-8">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
</svg>

    )
}

function SwapInputRow({onSelect,selectedToken,amount,onAmountChange, title,subTitle, topBorderEnabled, bottomBorderEnabled} : {
    onSelect: (asset: TokenDetails) => void
    selectedToken: TokenDetails
    title: string
    amount?: string
    onAmountChange?: (value: string) => void
    subTitle?: ReactNode
    topBorderEnabled: boolean
    bottomBorderEnabled: boolean
}) {
    return(
        <div className={`border flex justify-between  ${topBorderEnabled ? "rounded-xl" :""} ${bottomBorderEnabled ? "rounded-xl" :""}`} >

        <div className="ml-4  px-3 py-3 rounded-lg mr-5 pb-5 justify-between w-full">
            {title}
            <AssetSelector selectedToken={selectedToken} onSelect={onSelect} />
            {/* 3.44.46 */}
        </div>
        <input type="text" onChange={(e) => {
            onAmountChange?.(e.target.value);
        
        }} className="px-3 flex justify-end outline-none text-4xl "dir="rtl" placeholder="0" name="" id="" />
        </div>
    )
}


function AssetSelector({selectedToken, onSelect}: {
    selectedToken: TokenDetails
    onSelect: (asset: TokenDetails) => void
}) {
    return(
        <div className="flex">
        
            <select name="" onChange={(e)=> {
                const selectedToken = SUPPORTED_TOKENS.find(x => x.name === e.target.value);
                if (selectedToken) {
                    onSelect(selectedToken);
                }
            }} id="" className="bg-gray-50 border pr-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:boder-blue-500 block  p-2.5 mt-2">
                <option selected><img src={selectedToken.images} className="w-10" alt="" />{selectedToken.name}</option>
                {SUPPORTED_TOKENS.map(token => <option selected={token.name === selectedToken.name}><img src={token.images} className="w-10" alt="" />{token.name}</option>)}
            </select>

        </div>
    )
}