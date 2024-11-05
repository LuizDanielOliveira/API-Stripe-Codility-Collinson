const Stripe = require('stripe');
const { STRIPE_API_KEY } = require('../settings');

class ProductsService {
    constructor() {
        this.stripe = new Stripe(STRIPE_API_KEY, {
            timeout: 10000 // 
        });
    }

    async getProduct(productId) {
        try {
            const product = await this.stripe.products.retrieve(productId);
            if (!product) {
                return null;
            }
            const price = await this.stripe.prices.retrieve(product.default_price);
            return { id: product.id, name: product.name, price: price.unit_amount };
        } catch (error) {
            console.error('Erro ao recuperar produto:', error);
            return null;
        }
    }
}

module.exports = ProductsService;
