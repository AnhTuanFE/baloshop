import express from 'express';
import multer from 'multer';
import cloudinary from 'cloudinary';
// import path from 'path';
// import fs from 'fs';
// const __dirname = path.resolve();
const Upload = express.Router();

//================= start Upload file - cũ======================
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'public/userProfile');
//     },
//     // By default, multer removes file extensions so let's add them back
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     },
// });
// // app.use(express.static('/public'));
// Upload.post('/', async (req, res) => {
//     // 'profile_pic' is the name of our file input field in the HTML form
//     let upload = multer({ storage: storage }).single('image');

//     upload(req, res, function (err) {
//         // req.file contains information of uploaded file
//         // req.body contains information of text fields, if there were any

//         if (req.fileValidationError) {
//             return res.send(req.fileValidationError);
//         } else if (!req.file) {
//             return res.send('Please select an image to upload');
//         } else if (err instanceof multer.MulterError) {
//             return res.send(err);
//         } else if (err) {
//             return res.send(err);
//         }

//         // Display uploaded image for user validation
//         // if (!!user?.image && req.body.image !== user.image) {
//         //     fs.unlink(path.join(__dirname, 'public', user.image), (err) => {
//         //         if (err) console.log('Delete old avatar have err:', err);
//         //     });
//         // }
//         res.send(req.file);
//     });
// });
//================= end Upload file - cũ======================
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

Upload.post('/', upload, async (req, res) => {
    const imagePath = req.file.path;
    cloudinary.v2.uploader.upload(imagePath, { folder: 'baloshopAvatar' }, function (err, result) {
        if (err) {
            req.json(err.message);
        }
        req.body.image = result.secure_url;
        let urlImage = req.body.image;
        req.body.imageId = result.public_id; //name image trong cloudinary
        res.send(urlImage);
    });
});
export default Upload;
