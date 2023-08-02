import dotenv from 'dotenv';
dotenv.config();

const baseURL = {
    url: `http://localhost:${process.env.PORT}`,
    urlUser: `http://localhost:7000`,
};

export default baseURL;
