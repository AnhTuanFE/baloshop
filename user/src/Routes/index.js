// layout
import HeaderLayout from '~/components/Layout/HeaderLayout/HeaderLayout';
import FooterLayout from '~/components/Layout/FooterLayout/FooterLayout';
//pages
import Home from '~/pages/Home/Home';
import DetailProduct from '~/pages/Products/DetailProduct';
import Login from '~/pages/Login/Login';
import Register from '~/pages/Register/Register';
import Cart from '~/pages/Cart';

import DeliveryAddress from '~/pages/DeliveryAddress';
import Payment from '~/pages/Payment/Payment';
import PlaceOrder from '~/pages/PlaceOrder/PlaceOrder';
import Order from '~/pages/Order/Order';
import Profile from '~/pages/Profile/Profile';
import PurchaseHistory from '~/pages/PurchaseHistory';
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
    { path: '/login', component: Login, layout: HeaderLayout },
    { path: '/register', component: Register, layout: HeaderLayout },
    { path: '*', component: NotFound, layout: HeaderLayout },
];

const privateRoutes = [
    { path: '/test', component: TestPage },
    { path: '/profile', component: Profile, layout: HeaderLayout },

    { path: '/cart/:id?', component: Cart, layout: HeaderLayout },
    { path: '/deliveryaddress', component: DeliveryAddress, layout: HeaderLayout },
    { path: '/payment', component: Payment, layout: HeaderLayout },
    { path: '/placeorder', component: PlaceOrder, layout: HeaderLayout },
    { path: '/order/:id', component: Order, layout: HeaderLayout },
    { path: '/purchasehistory', component: PurchaseHistory, layout: HeaderLayout },
];

export { publicRoutes, privateRoutes };
