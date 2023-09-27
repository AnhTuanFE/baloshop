import ImportData from './DataImport.js';
import productRoute from './ProductRoutes.js';
import userRouter from './UserRoutes.js';
import orderRouter from './orderRoutes.js';
import SliderRouter from './SliderRouter.js';
import cartRoutes from './cartRoutes.js';
import categoryRoute from './categoryRouter.js';
import newsRouter from './newsRouter.js';
import forgotPassRouter from './forgotPassRouter.js';
import createUserRouter from './createUserRouter.js';
import paypalRouter from './paypalRouter.js';
import GHTK_Router from './GHTK_Router.js';
import paymentRouter from './paymentRoutes.js';
import { errorHandler, notFound } from '../middleware/Errors.js';
const routes = (app) => {
    app.use('/', () => {
        return {};
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
    app.use('/api/payments', paymentRouter);
    app.get('/api/config/paypal', (req, res) => {
        res.send(process.env.PAYPAL_CLIENT_ID);
    });
    // forgot
    app.use('/api/forgotPass', forgotPassRouter);
    app.use('/api/verifiedEmail', createUserRouter);
    app.use('/api/paypal', paypalRouter);
    // ERROR HANDLER
    app.use(notFound);
    app.use(errorHandler);
};
export default routes;
