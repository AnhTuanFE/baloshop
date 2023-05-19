// import { admin, protect } from './../Middleware/AuthMiddleware.js';
import express from 'express';
import ImageCloudinary from '../Models/ImageCloudinaryModel.js';
import multer from 'multer';
import cloudinary from 'cloudinary';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';

const ImageUploadCloudinaryRouter = express.Router();
const storage = multer.diskStorage({
    filename: function (req, file, callback) {
        callback(null, Date.now() + file.originalname);
    },
});
// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     folder: 'baloshopImage', // tên thư mục lưu trữ trên Cloudinary
//     allowedFormats: ['jpg', 'png', 'jpeg', 'gif'], // các định dạng được phép upload
//     transformation: [{ width: 500, height: 500, crop: 'limit' }], // định dạng kích thước ảnh
// });
const imageFilter = function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are accepted!'), false);
    }
    cb(null, true);
};
const upload = multer({ storage: storage, fileFilter: imageFilter });

ImageUploadCloudinaryRouter.post('/add', upload.single('image'), (req, res) => {
    const imagePath = req.file.path;

    cloudinary.v2.uploader.upload(imagePath, function (err, result) {
        if (err) {
            req.json(err.message);
        }
        req.body.image = result.secure_url;
        // add image's public_id to image object
        req.body.imageId = result.public_id;

        const ImageProduct = new ImageCloudinary({
            imageId: req.body.imageId,
            title: req.body.title,
            image: req.body.image,
        });
        if (ImageProduct) {
            const createImageCloudinary = ImageCloudinary.create(ImageProduct);
            res.status(201).json(createImageCloudinary);
        } else {
            res.status(400);
            throw new Error("Can't upload image");
        }
    });
});

export default ImageUploadCloudinaryRouter;
