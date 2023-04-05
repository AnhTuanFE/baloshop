import Home from '~/pages/Home/Home';
import Products from '~/components/ProductsComponent/Products';
import Login from '~/pages/Login/Login';
import Register from '~/pages/Register/Register';

const publicRoutes = [
    { path: '/', component: Home, layout: null },
    { path: '/products', component: Products },
    { path: '/login', component: Login, layout: null },
    { path: '/register', component: Register, layout: null },
    // { path: '/', component: , layout: null },
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
