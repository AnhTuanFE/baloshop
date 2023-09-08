import dotenv from 'dotenv';
dotenv.config();

const baseURL = {
    // url: `http://localhost:${process.env.PORT}`,
    // urlUser: `http://localhost:7000`,
    url: `https://baloshop-api.vercel.app/`,
    urlUser: `https://baloshop-user.vercel.app/`,
};

export default baseURL;
