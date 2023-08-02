import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import connectDatabase from './config/MongoDb.js';
import connectCloudinary from './config/CloudinaryConfig.js';
import ImportData from './DataImport.js';
import productRoute from './Routes/ProductRoutes.js';
import { errorHandler, notFound } from './Middleware/Errors.js';
import userRouter from './Routes/UserRoutes.js';
import orderRouter from './Routes/orderRoutes.js';
import SliderRouter from './Routes/SliderRouter.js';
import cartRoutes from './Routes/cartRoutes.js';
import categoryRoute from './Routes/categoryRouter.js';
import newsRouter from './Routes/newsRouter.js';
import forgotPassRouter from './Routes/forgotPassRouter.js';
import createUserRouter from './Routes/createUserRouter.js';
import paypalRouter from './Routes/paypalRouter.js';
import GHTK_Router from './Routes/GHTK_Router.js';
import cors from 'cors';
dotenv.config();
// import { Server } from 'http'; //deploy thì comment
import imageProfile from './Routes/imageProfile.js';

connectDatabase();
connectCloudinary();
const app = express();
app.use(express.json()); // gửi data dưới dạng javascrip thì nó sẽ xử lý

// API
// cấu hình định danh file ejs bên express
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false })); //gửi data dưới dạng form thì nó sẽ xử lý
// app.use('/public', express.static('public'));
app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb', extended: true }));
// Initialize CORS middleware
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use('/api/cart', cartRoutes);
app.use('/api/slider', SliderRouter);
app.use('/api/news', newsRouter);
app.use('/api/import', ImportData);
app.use('/api/products', productRoute);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/ghtk', GHTK_Router);
app.use('/api/category', categoryRoute);
app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID);
});
app.use('/api/imageProfile', imageProfile);
// forgot
app.use('/api/forgotPass', forgotPassRouter);
app.use('/api/verifiedEmail', createUserRouter);
app.use('/api/paypal', paypalRouter);

// ERROR HANDLER
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 1000;

app.listen(PORT, console.log(`server run in port ${PORT}`));

// export default Server;
