import HeaderOnly from '~/layouts/headerOnly/HeaderOnly';
// import FooterOnly from '~/layouts/footerOnly/FooterOnly';
import Home from '~/pages/Home/Home';
import DetailProduct from '~/pages/Products/DetailProduct/DetailProduct';
import Login from '~/pages/Login/Login';
import Register from '~/pages/Register/Register';
import Cart from '~/pages/Cart';

import DeliveryAddress from '~/pages/DeliveryAddress';
import Payment from '~/pages/Payment/Payment';
import PlaceOrder from '~/pages/PlaceOrder/PlaceOrder';
import Order from '~/pages/Order/Order';
import Profile from '~/pages/Profile/Profile';
import PurchaseHistory from '~/pages/PurchaseHistory';
import ResetPassword from '~/pages/ResetPassword/ResetPassword';
import NotFound from '~/pages/NotFound/NotFound';
// test private route tý xóa
import TestPage from '~/pages/TestPage/TestPage';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/search/:keyword/sortProducts/:sortProducts/rating/:rating/page/:pageNumber', component: Home },
    { path: '/search/:keyword/page/:pageNumber', component: Home },
    { path: '/search/:keyword', component: Home },

    { path: '/category/:category/sortProducts/:sortProducts/rating/:rating/page/:pageNumber', component: Home },
    { path: '/category/:category/page/:pageNumber', component: Home },
    { path: '/category/:category', component: Home },

    { path: '/sortProducts/:sortProducts/rating/:rating/page/:pageNumber', component: Home },
    { path: '/sortProducts/:sortProducts/page/:pageNumber', component: Home },

    { path: '/page/:pageNumber', component: Home },
    { path: '/rating/:rating/page/:pageNumber', component: Home },

    // =========
    { path: '/product/:id', component: DetailProduct },
    { path: '/login', component: Login, layout: HeaderOnly },
    { path: '/register', component: Register, layout: HeaderOnly },
    { path: '/resetpassword', component: ResetPassword, layout: HeaderOnly },

    { path: '*', component: NotFound, layout: HeaderOnly },
];

const privateRoutes = [
    { path: '/test', component: TestPage },
    { path: '/profile', component: Profile, layout: HeaderOnly },

    { path: '/cart/:id?', component: Cart, layout: HeaderOnly },
    { path: '/deliveryaddress', component: DeliveryAddress, layout: HeaderOnly },
    { path: '/payment', component: Payment, layout: HeaderOnly },
    { path: '/placeorder', component: PlaceOrder, layout: HeaderOnly },
    { path: '/order/:id', component: Order, layout: HeaderOnly },
    { path: '/purchasehistory', component: PurchaseHistory, layout: HeaderOnly },
];

export { publicRoutes, privateRoutes };
