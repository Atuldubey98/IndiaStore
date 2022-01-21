const express = require('express');
const { getProduct } = require('../controllers/products');

const router = express.Router();

router.post('/', getProduct);

module.exports =router;