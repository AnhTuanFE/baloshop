import express from 'express';
import asyncHandler from 'express-async-handler';
import { admin, protect } from '../middleware/AuthMiddleware.js';
// import Category from '../Models/CategoryModel.js';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import productController from '../controllers/productController.js';

const __dirname = path.resolve();

const storage = multer.diskStorage({
    filename: function (req, file, callback) {
        callback(null, Date.now() + file.originalname);
    },
});
const imageFilter = function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|webp|gif|jfif)$/i)) {
        return cb(new Error('Only image files are accepted!'), false);
    }
    cb(null, true);
};
const upload = multer({ storage: storage, fileFilter: imageFilter });

const productRoute = express.Router();

// GET PRODUCT
productRoute.get('/', asyncHandler(productController.getProducts));

// GET ALL PRODUCT
productRoute.get('/ProductAll', asyncHandler(productController.getAllProduct));
//GET ALL COMMENT
productRoute.get('/ProductCommentAll', asyncHandler(productController.getAllProductComment));
// GET ALL COMMENTS ONLY ONE PRODUCT
productRoute.get('/:id/onlyProduct/allComments', asyncHandler(productController.getProductComment));

// GET ALL REVIEW ONLY ONE PRODUCT
productRoute.get('/:id/onlyProduct/allReview', asyncHandler(productController.getAllReview));

// ADMIN GET ALL PRODUCT WITHOUT SEARCH AND PEGINATION
productRoute.get('/admin', protect, admin, asyncHandler(productController.getProductsByAdmin));

// GET SINGLE PRODUCT
productRoute.get('/:id', asyncHandler(productController.getProductById));

// PRODUCT REVIEW
productRoute.post('/:id/review', protect, asyncHandler(productController.reviewProduct));

// PRODUCT COMMENT
productRoute.post('/:id/comment', protect, asyncHandler(productController.commentProduct));

// PRODUCT COMMENTCHILDS
productRoute.post('/:id/commentchild', protect, asyncHandler(productController.replyComment));

// DELETE PRODUCT
productRoute.delete('/:id', protect, admin, asyncHandler(productController.deleteProduct));

// DELETE PRODUCT OPTION COLOR AND AMOUNT
productRoute.post('/:id/delete', protect, admin, asyncHandler(productController.deleteProductOption));

productRoute.post('/', protect, admin, upload.single('image'), asyncHandler(productController.addProduct));

//CREATE COLOR
productRoute.post('/:id', protect, admin, asyncHandler(productController.addProductOption));

// UPDATE PRODUCT
productRoute.put('/:id', protect, admin, upload.single('image'), asyncHandler(productController.updateProduct));

// UPDATE OPTION COLOR AND AMOUNT PRODUCT
productRoute.put('/:id/option', protect, admin, asyncHandler(productController.updateProductOption));

// DELETE IMAGE PRODUCT
productRoute.post('/:id/deleteImage', protect, admin, asyncHandler(productController.deleteImageProduct));

// DELETE COMMENTS PRODUCT
productRoute.post('/:id/deleteComment', protect, admin, asyncHandler());

//DELETE COMMENTS CHILD
productRoute.post('/:id/deleteCommentChild', protect, admin, asyncHandler(productController.deleteReplyComment));

export default productRoute;
