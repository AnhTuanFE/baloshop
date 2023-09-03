import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { VerifyResetPassWordAction } from '~/redux/Actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { usersRemainingSelector } from '~/redux/Selector/usersSelector';
import Loading from '~/components/LoadingError/Loading';
import Message from '~/components/LoadingError/Error';

function VerifyResetPassWord() {
    const params = useParams();
    const dataNeedVerify = params;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { verifyState } = useSelector(usersRemainingSelector);
    const { loading, error, state } = verifyState;
    // console.log('verifyState = ', verifyState);
    if (state?.status === 'Verified Account') {
        navigate('/resetpassword');
    }
    useEffect(() => {}, [dataNeedVerify, params]);
    console.log('state?.status = ', state?.status);
    const handleVerify = () => {
        dispatch(VerifyResetPassWordAction(dataNeedVerify));
    };

    return (
        <div className="h-[80vh] bg-[#e9ebee]">
            <div className="pt-5">
                <div className="flex justify-center">
                    <div className="w-1/4">
                        {loading && <Loading />}
                        {error && <Message variant="alert-info text-lg">{error}</Message>}
                    </div>
                </div>
                <div className="flex h-[80vh] justify-center">
                    <div className="flex w-1/4">
                        <div className="h-[40vh] rounded-xl bg-white px-4 py-4">
                            <div className="mt-4 ">
                                <h2 className="mb-2 mt-3 text-center text-xl font-bold">
                                    Đây là trang xác thực việc đặt lại mật khẩu của bạn
                                </h2>
                                <hr></hr>
                                <p className="mt-3 text-center text-base font-medium">
                                    Hãy bấm vào nút xác thực bên dưới để xác nhận việc đặt lại mật khẩu
                                </p>
                                <div className="my-3 flex justify-center">
                                    <button
                                        className="rounded-xl bg-[var(--main-color)] px-5 py-2 font-semibold text-white hover:bg-[--color-button2]"
                                        onClick={handleVerify}
                                    >
                                        Xác thực
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VerifyResetPassWord;
