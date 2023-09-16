import path from 'path';
import multer from 'multer';
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

const upload = multer({
    fileFilter: imageFilter,
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024, //bytes->10MB
    },
});
export { upload };
