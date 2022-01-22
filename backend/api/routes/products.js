const express = require('express');
const { getProduct, getProducts, addProduct, deleteById } = require('../controllers/products');

const router = express.Router();

router.get('/', getProduct);
router.post('/',addProduct);
router.delete('/',deleteById);
router.get('/all', getProducts);
module.exports =router;