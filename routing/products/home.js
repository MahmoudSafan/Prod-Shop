const express = require('express');
const router = express.Router();
const productsCtrl = require('../../controller/products/home');

router.get('/cart', productsCtrl.getCart);
router.post('/cart', productsCtrl.postCart);
router.get('/orders', productsCtrl.getOrders);
router.get('/checkout', productsCtrl.getCheckout);
router.get('/product/:productId', productsCtrl.getDetails);
router.get('/', productsCtrl.getHome);

module.exports = router;