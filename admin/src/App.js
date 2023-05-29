import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Fragment } from 'react';
// import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

import { privateRoutes, publicRoutes } from './Routes';
import DefaulLayout from './layouts/DefaulLayout';
import RouteConfirmation from './Routes/RouteConfirmation';

import './App.css';
import './responsive.css';

// axios.defaults.baseURL = "https://dp-balo-store-api.vercel.app"

function App() {
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

                <Routes>
                    {publicRoutes.map((route, index) => {
                        let Layout = DefaulLayout;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </Router>
        </div>
    );
}

export default App;
