import Login from '~/pages/LoginScreen';
import HomeScreen from '~/pages/HomeScreen';

// import ProductScreen from '~/pages/productPages/ProductScreen';
import ProductScreen from '~/pages/productPages/ProductScreen';
import AddProduct from '~/pages/productPages/AddProduct';
import ProductEditScreen from '~/pages/productPages/ProductEditScreen';

import CategoriesScreen from '~/pages/CategoriesScreen';

import OrderScreen from '~/pages/orderPages/OrderScreen';
import OrderDetailScreen from '~/pages/orderPages/OrderDetailScreen';

import UsersScreen from '~/pages/UsersScreen';
import SliderScreen from '~/pages/SliderScreen';
import CommentScreen from '~/pages/comment/CommentScreen';

import AddNewsScreen from '~/pages/news/AddNewsScreen';
import EditNewsScreen from '~/pages/news/EditNewsScreen';
import NewsScreen from '~/pages/news/NewsScreen';

import UploadImgCloudinary from '~/pages/uploadImgCloudinary/UploadImgCloudinary';
import NotFound from '~/pages/NotFound';

const privateRoutes = [
    { path: '/', component: HomeScreen },

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
    { path: '/uploadimage', component: UploadImgCloudinary },

    { path: '*', component: NotFound },
];

const publicRoutes = [{ path: '/login', component: Login, layout: null }];

export { publicRoutes, privateRoutes };
