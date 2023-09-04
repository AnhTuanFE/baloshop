import axios from 'axios';
import { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './Routes';
import DefaulLayout from './layouts/defaulLayout/defaulLayout';
import './App.css';
import RouteConfirmation from './Routes/RouteConfirmation';

// axios.defaults.baseURL = 'https://baloshop-api.vercel.app/';
// axios.defaults.baseURL = 'http://localhost:7000/';

function App() {
    return (
        <div>
            <Router>
                <div className="App">
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
                </div>
            </Router>
        </div>
    );
}

export default App;
