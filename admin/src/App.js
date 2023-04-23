import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

import { privateRoutes } from './Routes';
import DefaulLayout from './layouts/DefaulLayout';
import RouteConfirmation from './Routes/RouteConfirmation';

import './App.css';
import './responsive.css';

import { listProducts } from './Redux/Actions/ProductActions';
import { listOrders } from './Redux/Actions/OrderActions';
import { listUser } from './Redux/Actions/userActions';

// axios.defaults.baseURL = "https://dp-balo-store-api.vercel.app"
axios.defaults.baseURL = 'http://localhost:9001/';

function App() {
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listProducts());
            dispatch(listOrders());
            dispatch(listUser());
        }
    }, [dispatch, userInfo]);
    return (
        <div>
            <Router>
                <Routes>
                    {privateRoutes.map((route, index) => {
                        let Layout = DefaulLayout;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        const Page = route.component;
                        return (
                            <Route key={index} element={<RouteConfirmation />}>
                                <Route
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            </Route>
                        );
                    })}
                </Routes>
            </Router>
        </div>
    );
}

export default App;
