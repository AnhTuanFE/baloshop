import Home from '~/pages/Home/Home';
import Products from '~/components/ProductsComponent/Products';
import Login from '~/components/Login/Login';
import ListAllProducts from '~/components/HomeComponent/ListAllProducts';
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/upload', component: null, layout: null },
    { path: '/products', component: Products },
    { path: '/login', component: Login, layout: null },
    { path: '/all', component: ListAllProducts, layout: null },
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
