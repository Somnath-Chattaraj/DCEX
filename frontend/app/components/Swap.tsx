"use client";
import { useState } from "react";
import { SUPPORTED_TOKENS, TokenDetails } from "@/app/libs/token";

export const Swap = () => {
    const [baseAssest, setBaseAsset] = useState(SUPPORTED_TOKENS[0]);
    const [quoteAsset, setQuoteAsset] = useState(SUPPORTED_TOKENS[1]);
    return (
        <div>
            
        </div>
    )
}

function SwapInputRow({onSelect} : {
    onSelect: (asset: TokenDetails) => void
}) {
    return(
        <div className="border flex justify-between">
            <AssetSelector  /> 
            {/* 3.44.46 */}
        </div>
    )
}


function AssetSelector({selectedToken}: {
    selectedToken: TokenDetails

}) {
    return(
        <div>

        </div>
    )
}