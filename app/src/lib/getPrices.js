import { globianceAPI } from './const';

export const getPrices = async () => {
    return fetch(`${globianceAPI}/currenciesUsdPrice`);
}