import Home from '~/pages/Home/Home';
// import Products from '~/pages/Products';
import DetailProduct from '~/pages/Products/DetailProduct';
import Login from '~/pages/Login/Login';
import Register from '~/pages/Register/Register';
// layout
import HeaderLayout from '~/components/Layout/HeaderLayout/HeaderLayout';
import FooterLayout from '~/components/Layout/FooterLayout/FooterLayout';
// test private route tý xóa
import TestPage from '~/pages/TestPage/TestPage';
const publicRoutes = [
    { path: '/', component: Home, layout: FooterLayout },
    { path: '/product/:id', component: DetailProduct },
    { path: '/login', component: Login, layout: HeaderLayout },
    { path: '/register', component: Register, layout: HeaderLayout },
];
const privateRoutes = [{ path: '/test', component: TestPage }];

export { publicRoutes, privateRoutes };
