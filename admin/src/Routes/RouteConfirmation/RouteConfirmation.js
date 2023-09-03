import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

function RouteConfirmation() {
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    // if (userInfo ? userInfo.isAdmin : "") {
    //     return <Outlet />;
    // } else {
    //     return <Navigate to="./login" />;
    // }
    return userInfo?.isAdmin ? <Outlet /> : <Navigate to="/login" />;
}
export default RouteConfirmation;
