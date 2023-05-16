import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { usersRemainingSelector } from '~/redux/Selector/usersSelector';

function RouteConfirmation() {
    const { userLogin } = useSelector(usersRemainingSelector);
    const { userInfo } = userLogin;

    return userInfo ? <Outlet /> : <Navigate to="/login" />;
}
export default RouteConfirmation;
