const express = require('express');
const router = express.Router();
const errorCtrl = require('../../controller/error/notFound');

router.use('', errorCtrl.notFoundPage);

module.exports = router;