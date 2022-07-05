import { API_URL } from './const';

export const getAddress = async (orderId, symbol) => {
    return fetch(`${API_URL}/merchant/createAddress?symbol=${symbol}&orderId=${orderId}`);
}