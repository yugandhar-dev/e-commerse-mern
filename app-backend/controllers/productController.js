import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @desc     Fetch all products
// @route    GET /api/products
// @access   Public
export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  // res.status(401);
  // throw new Error('Not Authorized');
  res.json(products);
});

// @desc     Fetch single product
// @route    GET /api/products/:id
// @access   Public
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  } else {
    res.json(product);
  }
});
