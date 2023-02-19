import Home from "~/pages/Home/Home";
import Products from "~/components/ProductsComponent/Products";
import Login from "~/components/Login/Login";
import NavBar from "~/components/HomeComponent/navbar";
const publicRoutes = [
  { path: "/", component: Home },
  { path: "/upload", component: null, layout: null },
  { path: "/products", component: Products },
  { path: "/login", component: Login, layout: null },
  { path: "/navbar", component: NavBar, layout: null },
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
