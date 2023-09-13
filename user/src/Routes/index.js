import HeaderOnly from '~/layouts/headerOnly';
// import FooterOnly from '~/layouts/footerOnly/FooterOnly';
import Home from '~/pages/Home';
import DetailProduct from '~/pages/Products/DetailProduct/DetailProduct';
import Login from '~/pages/Login/Login';
import Register from '~/pages/Register/Register';
import Cart from '~/pages/Cart';

import DeliveryAddress from '~/pages/DeliveryAddress';
import PlaceOrder from '~/pages/PlaceOrder/PlaceOrder';
import PaymentPaypal from '~/pages/PaymentPaypal/PaymentPaypal';
import Order from '~/pages/Order';
import Profile from '~/pages/Profile/Profile';
import PurchaseHistory from '~/pages/PurchaseHistory';
import ResetPasswordRequest from '~/pages/ResetPasswordRequest/ResetPasswordRequest';
import ResetPassword from '~/pages/ResetPassword/ResetPassword';
import NotFound from '~/pages/NotFound/NotFound';
import Test from '~/pages/Test/Test';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/search/:keyword/sortBy/:sortBy/rating/:rating/page/:pageNumber', component: Home },
    { path: '/search/:keyword/page/:pageNumber', component: Home },
    { path: '/search/:keyword', component: Home },

    { path: '/category/:category/sortBy/:sortBy/rating/:rating/page/:pageNumber', component: Home },
    { path: '/category/:category/page/:pageNumber', component: Home },
    { path: '/category/:category', component: Home },

    { path: '/sortBy/:sortBy/rating/:rating/page/:pageNumber', component: Home },
    { path: '/sortBy/:sortBy/page/:pageNumber', component: Home },

    { path: '/page/:pageNumber', component: Home },
    { path: '/rating/:rating/page/:pageNumber', component: Home },

    // =========
    { path: '/product/:id', component: DetailProduct },
    { path: '/login', component: Login, layout: HeaderOnly },
    { path: '/register', component: Register, layout: HeaderOnly },
    { path: '/resetpassword-request', component: ResetPasswordRequest, layout: HeaderOnly },

    { path: '/reset-password/:id/:token/:email', component: ResetPassword, layout: HeaderOnly },
    { path: '/test', component: Test, layout: null },

    { path: '*', component: NotFound, layout: HeaderOnly },
];

const privateRoutes = [
    { path: '/profile', component: Profile, layout: HeaderOnly },

    { path: '/cart/:id?', component: Cart, layout: HeaderOnly },
    { path: '/deliveryaddress', component: DeliveryAddress, layout: HeaderOnly },

    { path: '/placeorder', component: PlaceOrder, layout: HeaderOnly },
    { path: '/placeorder/paymentpaypal/:id', component: PaymentPaypal, layout: null },

    { path: '/order/:id', component: Order, layout: HeaderOnly },
    { path: '/purchasehistory', component: PurchaseHistory, layout: HeaderOnly },
];

export { publicRoutes, privateRoutes };
