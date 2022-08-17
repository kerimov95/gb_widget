import { globianceAPI } from './const';

export const getWhiteList = async (merchantKey, apiKey) => {
    return fetch(`${globianceAPI}/api/merchant/whitelist/get_balance?merchantKey=${merchantKey}`, {
        headers: {
            Authorization: apiKey
        }
    });
}