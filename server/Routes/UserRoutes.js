import express from 'express';
import asyncHandler from 'express-async-handler';
import multer from 'multer';
import { protect, admin } from '../Middleware/AuthMiddleware.js';
import generateToken from '../utils/generateToken.js';
import cloudinary from 'cloudinary';
import User from './../Models/UserModel.js';
import jwt from 'jsonwebtoken';

const userRouter = express.Router();

// LOGIN
userRouter.post(
    '/login',
    asyncHandler(async (req, res) => {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (user?.disabled) {
            res.status(400);
            throw new Error('Tài khoản đã bạn đã bị khóa, vui lòng liên hệ shop để có thể lấy lại');
        }
        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
                createdAt: user.createdAt,
                address: user.address,
                city: user.city,
                country: user.country,
                image: user.image,
                disabled: user.disabled,
            });
        } else {
            res.status(401);
            throw new Error('Invalid Email or Password');
        }
    }),
);

// REGISTER
userRouter.post(
    '/',
    asyncHandler(async (req, res) => {
        const { name, email, phone, password } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(400);
            throw new Error('User already exists');
        }

        const user = await User.create({
            name,
            email,
            phone,
            password,
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                isAdmin: user.isAdmin,
                address: user.address,
                city: user.city,
                country: user.country,
                image: user.image,
                disabled: user.disabled,
                token: generateToken(user._id),
            });
        } else {
            res.status(400);
            throw new Error('Invalid User Data');
        }
    }),
);

// PROFILE
userRouter.get(
    '/user',
    protect,
    asyncHandler(async (req, res) => {
        // const user = await User.findById(req.user._id);
        let token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log('decoded = ', decoded);
        // console.log('token = ', token);

        const user = await User.findById(decoded.id).select('-password');

        if (user) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                isAdmin: user.isAdmin,
                createdAt: user.createdAt,
                address: user.address,
                city: user.city,
                country: user.country,
                image: user.image,
                disabled: user.disabled,
            });
        } else {
            res.status(404);
            throw new Error('User not found');
        }
    }),
);

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

userRouter.put(
    '/profile',
    protect,
    upload,
    asyncHandler(async (req, res) => {
        try {
            const imagePath = req?.file?.path;
            const { id, name, phone, country, city, address, nameImage } = req?.body;
            // console.log('req.body = ', req.body);
            // console.log('imagePath = ', req.file?.path);
            const user = await User.findById(id);

            if (user) {
                if (user?.disabled) {
                    res.status(400);
                    throw new Error('account lock up');
                } else if (imagePath) {
                    cloudinary.uploader.destroy(nameImage, function (error, result) {
                        try {
                            console.log('result = ', result, 'error = ', error);
                        } catch (err) {
                            console.log('lỗi = '.err);
                        }
                    });
                    cloudinary.v2.uploader.upload(
                        imagePath,
                        { folder: 'baloshopAvatar' },
                        async function (err, result) {
                            if (err) {
                                req.json(err.message);
                            }
                            const imageURL = result.secure_url;
                            const imageID = result.public_id;

                            const filter = { _id: id };
                            const update = {
                                $set: {
                                    name: name,
                                    phone: phone,
                                    country: country,
                                    city: city,
                                    address: address,
                                    image: {
                                        urlImageCloudinary: imageURL,
                                        idImageCloudinary: imageID,
                                    },
                                },
                            };
                            const updataStatus = await User.updateOne(filter, update);
                            res.json({
                                _id: id || user.id,
                                name: name || user.name,
                                phone: phone || user.phone,
                                isAdmin: user.isAdmin,
                                createdAt: user.createdAt,
                                token: generateToken(user.id),
                                email: user.email,
                                address: address || user.address,
                                city: city || user.city,
                                country: country || user.country,
                                image: {
                                    urlImageCloudinary: imageURL,
                                    idImageCloudinary: imageID,
                                },
                                disabled: user.disabled,
                            });
                        },
                    );
                } else if (req.body.password) {
                    if (await user.matchPassword(req.body.oldPassword)) {
                        user.password = req.body.password;
                        const updatedPassword = await user.save();
                        res.json({
                            _id: updatedPassword._id,
                            name: updatedPassword.name,
                            email: updatedPassword.email,
                            phone: updatedPassword.phone,
                            isAdmin: updatedPassword.isAdmin,
                            createdAt: updatedPassword.createdAt,
                            token: generateToken(updatedPassword._id),
                            address: user.address,
                            city: user.city,
                            country: user.country,
                            image: user.image,
                            disabled: user.disabled,
                        });
                    } else {
                        res.status(404);
                        throw new Error('Old Password is not correct!');
                    }
                } else {
                    user.name = req.body.name || user.name;
                    user.phone = req.body.phone || user.phone;
                    user.address = req.body.address || user.address;
                    user.city = req.body.city || user.city;
                    user.country = req.body.country || user.country;

                    const updatedUser = await user.save();
                    res.json({
                        _id: updatedUser._id,
                        name: updatedUser.name,
                        phone: updatedUser.phone,
                        address: updatedUser.address,
                        city: updatedUser.city,
                        country: updatedUser.country,
                        email: user.email,
                        isAdmin: updatedUser.isAdmin,
                        createdAt: updatedUser.createdAt,
                        token: generateToken(updatedUser._id),
                        image: user.image,
                        disabled: user.disabled,
                    });
                }
            } else {
                res.status(404);
                throw new Error('User not found');
            }
        } catch (error) {
            throw new Error(error);
        }
    }),
);

// GET ALL USER ADMIN
userRouter.get(
    '/',
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const users = await User.find({});
        res.json(users);
    }),
);

// GET ALL USER
userRouter.get(
    '/all',
    asyncHandler(async (req, res) => {
        let allUser = [];
        const users = await User.find({});
        for (let i = 0; i < users.length; i++) {
            allUser.push({ _id: users[i]._id, image: users[i].image });
        }
        res.json(allUser);
    }),
);

// PUT DISPAD USER
userRouter.put(
    '/:id/disabled',
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const { disabled } = req.body;
        const user = await User.findById(req.params.id);
        if (user.isAdmin) {
            res.status(400);
            throw new Error('error');
        }
        if (disabled == user.disabled) {
            if (disabled == true) {
                res.status(400);
                throw new Error(disabled);
            } else {
                res.status(400);
                throw new Error(disabled);
            }
        }
        if (user) {
            user.disabled = disabled;
            const retult = await user.save();
            res.status(201).json(retult);
        }
    }),
);

export default userRouter;
