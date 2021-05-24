const express = require('express');
const router = express.Router();
const adminCtrl = require('../../controller/admin/adminCtrl');

router.post('/add-product', adminCtrl.postProduct);
router.get('/add-product', adminCtrl.getProduct);
router.get('/adminPanal', adminCtrl.getAdminPanal);
router.get('/edit-product/:productId', adminCtrl.getEditProduct);
router.post('/edit-product', adminCtrl.postEditProduct);
router.post('/delete-product', adminCtrl.postDeleteProduct);
module.exports = router;