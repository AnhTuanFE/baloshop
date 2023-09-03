import Login from '~/pages/loginPage/LoginScreen';
import HomeScreen from '~/pages/HomePage/HomeScreen';

import ProductScreen from '~/pages/productPages/ProductScreen';
import AddProduct from '~/pages/productPages/AddProduct';
import ProductEditScreen from '~/pages/productPages/ProductEditScreen';

import CategoriesScreen from '~/pages/categoryPage/CategoriesScreen';

import OrderScreen from '~/pages/orderPages/OrderScreen';
import OrderDetailScreen from '~/pages/orderPages/OrderDetailScreen';

import UsersScreen from '~/pages/userPages/UsersScreen';
import SliderScreen from '~/pages/sliderPages/SliderScreen';
import CommentScreen from '~/pages/comment/CommentScreen';

import AddNewsScreen from '~/pages/news/AddNewsScreen';
import EditNewsScreen from '~/pages/news/EditNewsScreen';
import NewsScreen from '~/pages/news/NewsScreen';
import NotFound from '~/pages/notFound/NotFound';

const publicRoutes = [
    { path: '/login', component: Login, layout: null },

    { path: '*', component: NotFound, layout: null },
];

const privateRoutes = [
    { path: '/', component: HomeScreen },
    { path: '/home', component: HomeScreen },

    { path: '/products', component: ProductScreen },
    { path: '/products/page/:pageNumber', component: ProductScreen },
    { path: '/products/search/:keyword', component: ProductScreen },
    { path: '/products/category/:category', component: ProductScreen },
    { path: '/products/search/:keyword/page/:pageNumber', component: ProductScreen },
    { path: '/products/category/:category/page/:pageNumber', component: ProductScreen },
    { path: '/product/:id/edit', component: ProductEditScreen },

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
];

export { publicRoutes, privateRoutes };
