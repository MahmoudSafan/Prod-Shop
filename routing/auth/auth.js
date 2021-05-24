const express = require('express');
const router = express.Router();
const authCtrl = require('../../controller/auth/auth.js');

router.get('/login', authCtrl.getLogin);
router.post('/login', authCtrl.postLogin);

module.exports = router;