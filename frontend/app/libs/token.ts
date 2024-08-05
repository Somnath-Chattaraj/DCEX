export interface TokenDetails {
    name: string;
    mint: string;
    native: boolean;
    price: string;
    images: string;
}

export const SUPPORTED_TOKENS: TokenDetails[] = [
    {
        name: "USDC",
        mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        native: false,
        price: "1",
        images: 
            "../../public/USDC.webp",
        
    },
    {
        name: "USDT",
        mint: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
        native: false,
        price: "1",
        images: 
            "../../public/USDT.webp",
        
    },
    {
        name: "SOL",
        mint: "So11111111111111111111111111111111111111112",
        native: true,
        price: "1",
        images: 
            "../../public/SOL.webp",
        
    },
];