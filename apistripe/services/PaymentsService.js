const Stripe = require('stripe');
const { STRIPE_API_KEY } = require('../settings');

class PaymentsService {
    constructor() {
        this.stripe = new Stripe(STRIPE_API_KEY, { timeout: 200 });
    }

    async createCheckoutSession(product, quantity) {
        try {
            const session = await this.stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [{
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: product.name,
                        },
                        unit_amount: product.price,
                    },
                    quantity: quantity,
                }],
                mode: 'payment',
                success_url: 'http://localhost:3000/success',
                cancel_url: 'http://localhost:3000/cancel',
            });
            return session;
        } catch (error) {
            console.error('Erro ao criar sessão de checkout:', error);
            throw error;
        }
    }
}

module.exports = PaymentsService;
