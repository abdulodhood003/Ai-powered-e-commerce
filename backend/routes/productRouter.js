import express from 'express';
import { addProduct, listProducts, removeProduct, singleProduct } from '../controllers/productController.js';
import upload from '../config/middleware/multer.js';
import adminAuth from '../config/middleware/adminAuth.js';

const productRouter = express.Router();

// Add product with multiple image upload
productRouter.post(
  '/add',
  adminAuth,
  upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 }
  ]),
  addProduct
);

// Remove product
productRouter.post('/remove', adminAuth, removeProduct);

// Get single product info
productRouter.post('/single', singleProduct);

// List all products
productRouter.get('/list', listProducts);

export default productRouter;
