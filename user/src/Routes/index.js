import Home from '~/pages/Home/Home';
import Products from '~/components/ProductsComponent/Products';
import Login from '~/components/Login/Login';
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/products', component: Products },
    { path: '/login', component: Login, layout: null },
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
