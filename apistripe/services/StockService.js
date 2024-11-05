class StockService {
    constructor() {
        this.stock = {
            'product1': 10,
            'prod_RA5EDd6iARKwiD': 5, 
        };
    }

    getProductAvailability(productId, quantity) {
        if (this.stock[productId] && this.stock[productId] >= quantity) {
            return true;
        }
        return false;
    }
}

module.exports = StockService;
