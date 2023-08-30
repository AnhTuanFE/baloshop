import express from 'express';
import dotenv from 'dotenv';
import { errorHandler, notFound } from './middleware/Errors.js';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import connectDatabase from './config/mongoDb.js';
import cloudinaryConfig from './config/cloudinaryConfig.js';
import paypalConfig from './config/paypalConfig.js';
import cors from 'cors';
import routes from './routes/index.js';
dotenv.config();

connectDatabase();
cloudinaryConfig();
paypalConfig();

const app = express();
app.use(express.json()); // gửi data dưới dạng javascrip thì nó sẽ xử lý
app.use(morgan('dev'));

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
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    next();
});
//handle route for api v1.0
routes(app);

// app.use('/api/cart', cartRoutes);
// app.use('/api/slider', SliderRouter);
// app.use('/api/news', newsRouter);
// app.use('/api/import', ImportData);
// app.use('/api/products', productRoute);
// app.use('/api/users', userRouter);
// app.use('/api/orders', orderRouter);
// app.use('/api/ghtk', GHTK_Router);
// app.use('/api/category', categoryRoute);
// app.get('/api/config/paypal', (req, res) => {
//     res.send(process.env.PAYPAL_CLIENT_ID);
// });
// // forgot
// app.use('/api/forgotPass', forgotPassRouter);
// app.use('/api/verifiedEmail', createUserRouter);
// app.use('/api/paypal', paypalRouter);

// ERROR HANDLER
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 1000;

app.listen(PORT, console.log(`server run in port ${PORT}`));

// export default Server;
