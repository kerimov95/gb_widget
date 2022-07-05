import { API_URL } from './const';

export const checkPayment = async (uniqueId) => {
    return fetch(`${API_URL}/merchant/checkPayment?uniqueId=${uniqueId}`);
}