import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

// import { listCart, saveShippingAddress } from '~/redux/Actions/cartActions';
import { listCart, saveShippingAddress } from '~/redux/Actions/cartActions';
import { getUserDetails, updateUserProfile } from '~/redux/Actions/userActions';
import { ListProvince } from '~/redux/Actions/userActions';

import { ORDER_ADDRESS_MY_RESET } from '~/redux/Constants/OrderConstants';
import { USER_UPDATE_PROFILE_RESET } from '~/redux/Constants/UserContants';

import Message from '~/components/HomeComponent/LoadingError/Error';
import Toast from '~/components/HomeComponent/LoadingError/Toast';
import Loading from '~/components/HomeComponent/LoadingError/Loading';

import './DeliveryAddress.css';

const Toastobjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
};

function DeliveryAddress() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const UpdateProfile = useSelector((state) => state.userUpdateProfile);
    const { success: updatesuccess, error: updateError, loading: updateLoading } = UpdateProfile;

    const userDetails = useSelector((state) => state.userDetails);

    const province = useSelector((state) => state.province);
    useEffect(() => {
        dispatch(ListProvince());
    }, []);
    const GetDataProvince = province.province;

    // user lấy từ store
    const { loading, error, user } = userDetails;
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [image, setImage] = useState('');
    const [retult, setRetult] = useState('');
    const [distric, setDistric] = useState([]);

    useEffect(() => {
        if (updatesuccess) {
            dispatch({ type: USER_UPDATE_PROFILE_RESET });
            navigate('/payment');
        }
    }, [updatesuccess]);
    useEffect(() => {
        if (updateError === 'account lock up') {
            toast.error('Tài khoản của bạn đã bị khóa', Toastobjects);
            dispatch({ type: USER_UPDATE_PROFILE_RESET });
        }
    }, [dispatch, updateError]);
    useEffect(() => {
        dispatch(getUserDetails('profile'));
    }, []);

    useEffect(() => {
        if (user.address != undefined) {
            setAddress(user.address);
            setCity(user.city);
            setCountry(user.country);
            setImage(user.image);
        }
    }, [dispatch, user]);

    const valitor = (values) => {
        const { address, city, country } = values;
        if (address === '' || city === '' || country === '') {
            setRetult('Vui lòng nhập đầy đủ thông tin');
        } else return true;
    };
    const submitHandler = async (e) => {
        e.preventDefault();
        if (!valitor({ address, city, country })) return;
        dispatch(saveShippingAddress({ address, city, country }));
        dispatch(updateUserProfile({ id: user._id, address, city, country, image }));
        setRetult('');
    };

    const handleChooseProvince = (e) => {
        const temp = e.target.value;
        const arrDistric = GetDataProvince.find((arr) => {
            return arr.code == temp.toString();
        });
        // obiect
        setDistric(arrDistric);
        setCountry(arrDistric.name);
    };
    const handleChooseCiTy = (e) => {
        setCity(e.target.value);
    };
    const GetDefaulDistrict = () => {
        const tamp = country;
        const defaultDistric = GetDataProvince.find((arr) => {
            return arr.name == tamp.toString();
        });
        setDistric(defaultDistric);
    };
    return (
        <>
            <Toast />
            {updateLoading && <Loading />}
            <div className="container d-flex justify-content-center align-items-center login-center">
                <form className="Login col-md-8 col-lg-4 col-11" onSubmit={submitHandler}>
                    {retult !== '' && <Message variant="alert-danger text-center fs-6">{retult}</Message>}
                    <h4>Địa chỉ giao hàng</h4>
                    <div className="wrapSelect">
                        <select onChange={handleChooseProvince} className="carSelect">
                            <option disabled selected hidden>
                                {country}
                            </option>
                            {GetDataProvince.map((pro, index) => (
                                <option key={index} value={pro.code}>
                                    {pro.name}
                                </option>
                            ))}
                        </select>

                        <select onChange={handleChooseCiTy} className="carSelect" onClick={GetDefaulDistrict}>
                            <option disabled selected hidden>
                                {city}
                            </option>
                            {distric?.districts?.map((dis, index) => {
                                return <option key={index}>{dis.name}</option>;
                            })}
                        </select>
                    </div>
                    <input
                        type="text"
                        placeholder="Đường/Hẻm - Thôn/Phường"
                        value={address}
                        // required
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <button type="submit">Tiếp tục</button>
                </form>
            </div>
        </>
    );
}

export default DeliveryAddress;
