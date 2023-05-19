import cloudinary from 'cloudinary';
// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_HOST, //ENTER YOUR CLOUDINARY NAME
//     api_key: process.env.CLOUDINARY_API_KEY, // THIS IS COMING FROM CLOUDINARY WHICH WE SAVED FROM EARLIER
//     api_secret: process.env.CLOUDINARY_API_SECRET, // ALSO COMING FROM CLOUDINARY WHICH WE SAVED EARLIER
// });

const connectCloudinary = async () => {
    try {
        const connect = await cloudinary.config({
            cloud_name: process.env.CLOUDINARY_HOST, //ENTER YOUR CLOUDINARY NAME
            api_key: process.env.CLOUDINARY_API_KEY, // THIS IS COMING FROM CLOUDINARY WHICH WE SAVED FROM EARLIER
            api_secret: process.env.CLOUDINARY_API_SECRET, // ALSO COMING FROM CLOUDINARY WHICH WE SAVED EARLIER
        });
        console.log('Cloudinary Connected');
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
};
export default connectCloudinary;
