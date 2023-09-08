import { Fragment } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { privateRoutes, publicRoutes } from './Routes';
import DefaulLayout from './layouts/defaulLayout/DefaulLayout';
import RouteConfirmation from './Routes/RouteConfirmation';

import './App.css';
import './responsive.css';

// axios.defaults.baseURL = 'https://baloshop-api.vercel.app/';
function App() {
    return (
        <div>
            <Router>
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
