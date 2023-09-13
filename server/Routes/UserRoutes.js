import express from 'express';
import asyncHandler from 'express-async-handler';
import multer from 'multer';
import { protect, admin, protectUpdatePassword } from '../middleware/authMiddleware.js';
import userController from '../controllers/userController.js';

// UPDATE PROFILE
const storage = multer.diskStorage({
    filename: function (req, file, callback) {
        callback(null, Date.now() + file.originalname);
    },
});
const imageFilter = function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|jfif)$/i)) {
        return cb(new Error('Only image files are accepted!'), false);
    }
    cb(null, true);
};
const upload = multer({ storage: storage, fileFilter: imageFilter }).single('image');

const userRouter = express.Router();

// LOGIN
userRouter.post('/login', asyncHandler(userController.userLogin));

// REGISTER
userRouter.post('/', asyncHandler(userController.register));

// PROFILE
userRouter.get('/user', protect, asyncHandler(userController.getProfile));

userRouter.put('/profile', protect, upload, asyncHandler(userController.updateProfile));
userRouter.put('/updatePassword', protectUpdatePassword, asyncHandler(userController.updatePassword));

// GET ALL USER ADMIN
userRouter.get('/', protect, admin, asyncHandler(userController.getAllUser));

// GET ALL USER
userRouter.get('/all', asyncHandler(userController.getAllUser));

// PUT DISPAD USER
userRouter.put('/:id/disabled', protect, admin, asyncHandler(userController.disableUser));

export default userRouter;
