import mongoose from 'mongoose';

const imageCloudinarySchema = mongoose.Schema({
    imageId: String,
    title: String,
    image: String,
});
const ImageCloudinary = mongoose.model('ImageCloudinary', imageCloudinarySchema);
export default ImageCloudinary;
