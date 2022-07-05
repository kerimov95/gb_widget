import { API_URL } from './const';

export const hookPayment = async (txHash, symbol) => {
    return fetch(`${API_URL}/merchant/hook/${symbol}/${txHash}`);
}