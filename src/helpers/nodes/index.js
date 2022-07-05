class Node {
    constructor(id, symbol, name, url, getAddress, getPrice, getTransctions, paymentWithAddress, paymentWithWallet, type, contractAddress) {
        this.id = id;
        this.symbol = symbol;
        this.url = url;
        this.name = name;
        this.getAddress = getAddress;
        this.getPrice = getPrice;
        this.getTransctions = getTransctions;
        this.paymentWithAddress = paymentWithAddress;
        this.paymentWithWallet = paymentWithWallet;
        this.type = type;
        this.contractAddress = contractAddress;
    }
}

module.exports = Node;