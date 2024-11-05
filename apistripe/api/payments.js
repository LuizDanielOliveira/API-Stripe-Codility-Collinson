const express = require('express');
const router = express.Router();
const ProductsService = require('../services/ProductService');
const PaymentsService = require('../services/PaymentsService');
const StockService = require('../services/StockService');

const productService = new ProductsService();
const paymentsService = new PaymentsService();
const stockService = new StockService();

router.post('/', async (req, res) => {
    const { productData } = req.body;

    if (!productData || !productData.id || !productData.price || !productData.name || !productData.quantity) {
        return res.status(400).json({ error: 'Dados do produto inválidos.' });
    }

    try {
        const product = await productService.getProduct(productData.id);
        if (!product) {
            return res.status(404).json({ error: 'Produto não encontrado.' });
        }

        if (!stockService.getProductAvailability(productData.id, productData.quantity)) {
            return res.status(400).json({ error: 'Produto fora de estoque ou quantidade insuficiente.' });
        }

        if (product.price !== productData.price) {
            return res.status(400).json({ error: 'Preço do produto no payload é inválido.' });
        }

        const session = await paymentsService.createCheckoutSession(productData, productData.quantity);
        return res.status(200).json({ id: session.id, url: session.url });
    } catch (error) {
        console.error('Erro ao criar sessão de checkout:', error);
        return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});

module.exports = router;
