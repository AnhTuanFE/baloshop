// layout
// import HeaderLayout from '~/components/Layout/HeaderLayout/HeaderLayout';
// import FooterLayout from '~/components/Layout/FooterLayout/FooterLayout';

import HomeScreen from '~/pages/HomeScreen';
import ProductScreen from '~/pages/productScreen';
import CategoriesScreen from '~/pages/CategoriesScreen';
import OrderScreen from '~/pages/OrderScreen';
import OrderDetailScreen from '~/pages/OrderDetailScreen';
import AddProduct from '~/pages/AddProduct';
import Login from '~/pages/LoginScreen';
import UsersScreen from '~/pages/UsersScreen';
import ProductEditScreen from '~/pages/ProductEditScreen';
import NotFound from '~/pages/NotFound';
import SliderScreen from '~/pages/SliderScreen';
import AddNewsScreen from '~/pages/AddNewsScreen';
import EditNewsScreen from '~/pages/EditNewsScreen';
import NewsScreen from '~/pages/NewsScreen';
import CommentScreen from '~/pages/CommentScreen';

const privateRoutes = [
    { path: '/', component: HomeScreen },
    { path: '/login', component: Login },

    { path: '/products', component: ProductScreen },
    { path: '/products/page/:pageNumber', component: ProductScreen },
    { path: '/products/search/:keyword', component: ProductScreen },
    { path: '/products/category/:category', component: ProductScreen },
    { path: '/products/search/:keyword/page/:pageNumber', component: ProductScreen },
    { path: '/products/category/:category/page/:pageNumber', component: ProductScreen },

    { path: '/category', component: CategoriesScreen },

    { path: '/orders', component: OrderScreen },
    { path: '/orders/status/:status', component: OrderScreen },

    { path: '/orders/search/:keyword', component: OrderScreen },
    { path: '/orders/search/:keyword/status/:status', component: OrderScreen },
    { path: '/orders/search/:keyword/page/:pageNumber/status/:status', component: OrderScreen },

    { path: '/orders/page/:pageNumber', component: OrderScreen },
    { path: '/orders/page/:pageNumber/status/:status', component: OrderScreen },
    { path: '/orders/page/:pageNumber/search/:keyword', component: OrderScreen },

    { path: '/order/:id', component: OrderDetailScreen },
    { path: '/addproduct', component: AddProduct },
    { path: '/users', component: UsersScreen },
    { path: '/comment', component: CommentScreen },
    { path: '/slider', component: SliderScreen },
    { path: '/news', component: NewsScreen },
    { path: '/addnews', component: AddNewsScreen },
    { path: '/editnews/:id/edit', component: EditNewsScreen },
    { path: '/product/:id/edit', component: ProductEditScreen },

    { path: '*', component: NotFound },
];

const publicRoutes = [];

export { publicRoutes, privateRoutes };
