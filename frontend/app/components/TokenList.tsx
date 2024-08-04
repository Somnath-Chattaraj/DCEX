import { TokenWithBalance } from "../api/hooks/useTokens";

export function TokenList({tokens}: {
    tokens: TokenWithBalance[]
}) {
    return (
        <div>
            {tokens.map(t => <TokenRow token={t} />)}
        </div>
    )
}

function TokenRow({token}: {
    token: TokenWithBalance
}) {
    return (
        <div className="flex justify-between">

            <div className="flex">
                <div>
                    <img src={token.image} className="w-14 mr-2 my-4 h-14 rounded-full"  />
                </div>
                <div>
                    <div className="font-bold pt-4 pl-3">
                        {token.name}
                    </div>
                    <div className="font-bold pl-3">
                        {token.name} = ~${token.price}
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <div className="font-bold flex justify-end pt-7">{token.usdBalance}</div>
                    <div className="font-slim flex justify-end">{token.balance}</div>
                </div>
            </div>
        </div>
    )
}