import axios from "axios";

const COVALENT_API_KEY = import.meta.env.VITE_COVALENT_API_KEY;
const BASE_URL = "https://api.covalenthq.com/v1";
const CHAIN_ID = 1; // Ethereum Mainnet

export const getTokenBalances = async (walletAddress) => {
    try {
        const url = `${BASE_URL}/${CHAIN_ID}/address/${walletAddress}/balances_v2/?quote-currency=USD&format=JSON&nft=false&key=${COVALENT_API_KEY}`;
        const { data } = await axios.get(url);

        if (!data?.data?.items) {
            throw new Error("Invalid data format from Covalent");
        }

        const tokens = data.data.items
            .filter((token) =>
                token.type === "cryptocurrency" &&
                token.contract_ticker_symbol !== "ETH" &&
                parseFloat(token.balance) > 0
            )
            .map((token) => ({
                name: token.contract_name,
                symbol: token.contract_ticker_symbol,
                logo: token.logo_url,
                balance: parseFloat(token.balance) / Math.pow(10, token.contract_decimals),
                value: parseFloat(token.quote) || 0
            }));

        return tokens;
    } catch (err) {
        console.error("[getTokenBalances] Error:", err.message);
        throw new Error("Failed to fetch token balances.");
    }
};
