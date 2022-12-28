import Home from "~/pages/Home/Home";
// import Sliders from "~/components/HomeComponent/Sliders";
import ListNewProducts from "~/components/HomeComponent/ListNewProducts";
const publicRoutes = [
  { path: "/", component: Home },
  //   nếu cần hiển thị thêm layout nào thì cho vào
  { path: "/upload", component: null, layout: null },
  // { path: "/slider", component: Sliders, layout: null },
  { path: "/newproducts", component: ListNewProducts, layout: null },
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
