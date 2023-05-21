import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { VerifyResetPassWordAction } from '~/redux/Actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { usersRemainingSelector } from '~/redux/Selector/usersSelector';

function VerifyResetPassWord() {
    const params = useParams();
    const dataNeedVerify = params;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { verifyState } = useSelector(usersRemainingSelector);
    console.log('verifyState = ', verifyState);
    useEffect(() => {
        if (verifyState?.state?.status === 'Verified Account') {
            navigate('/resetpassword');
        }
    });
    const handleVerify = () => {
        dispatch(VerifyResetPassWordAction(dataNeedVerify));
    };

    return (
        <div>
            <h1>VerifyResetPassWord pages</h1>
            <button onClick={handleVerify}>Verified</button>
        </div>
    );
}

export default VerifyResetPassWord;
