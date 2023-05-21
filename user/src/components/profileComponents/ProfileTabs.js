import { useEffect, useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import isEmpty from 'validator/lib/isEmpty';
import Cropper from 'react-easy-crop';
import { Button } from '@mui/material';

import Message from '../HomeComponent/LoadingError/Error';
// import Toast from '../HomeComponent/LoadingError/Toast';
import Loading from '../HomeComponent/LoadingError/Loading';

import { updateUserPassword, updateUserProfile } from '~/redux/Actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '~/redux/Constants/UserContants';
import { ListProvince } from '~/redux/Actions/userActions';
import getCroppedImg from '../editAvatar/cropImage';
import { Alert, Space } from 'antd';
import imageDefaul from '~/utils/data';

// import { listCart } from '~/redux/Actions/cartActions';
// import { ListAvatar } from '~/redux/Actions/avatarAction';
// import { EditAvatart as App } from '../editAvatar/EditAvatart';
// import ImgDialog from '../editAvatar/ImgDialog';

import '../editAvatar/style.css';
import './ProfileTabs.css';
import { object } from 'joi';
const ProfileTabs = () => {
    const [visible, setVisible] = useState(false);
    const handleClose = () => {
        setVisible(false);
    };

    const handleAlertClose = () => {
        setTimeout(() => {
            handleClose();
        }, 2000);
    };
    <Space
        direction="vertical"
        style={{
            width: '100%',
        }}
    ></Space>;

    const [distric, setDistric] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [image, setImage] = useState();
    const [confirmPassword, setConfirmPassword] = useState('');
    const [uploadProfile, setUploadProfile] = useState(true); //ghi chú
    const [uploadPassword, setUploadPassword] = useState(false); //ghi chú
    const [checkbox, setCheckbox] = useState('0');
    const [checkFile, setCheckFile] = useState(true);
    const [checkImage, setCheckImage] = useState(false);
    const toastId = useRef(null);
    const refProfile = useRef(); /// ghi chú
    const refSetPassword = useRef(); /// ghi chú

    const dispatch = useDispatch();

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user, success: successDetail } = userDetails;

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const {
        successPass: updatesuccessPass,
        success: updatesuccess,
        loading: updateLoading,
        error: errorProfile,
    } = userUpdateProfile;

    const province = useSelector((state) => state.province);
    useEffect(() => {
        dispatch(ListProvince());
    }, []);
    const GetDataProvince = province.province;

    function checkProfile() {
        let x = Number(checkbox);
        if (x === 0) {
            setUploadProfile(true);
            setUploadPassword(false);
            setCheckbox('0');
        } else {
            setUploadProfile(true);
            setUploadPassword(false);
            setCheckbox('0');
        }
    }
    function checkSetPassword() {
        let y = Number(checkbox);
        if (y === 0) {
            setUploadProfile(false);
            setUploadPassword(true);
            setCheckbox('1');
        } else {
            setUploadProfile(false);
            setUploadPassword(true);
            setCheckbox('1');
        }
    }
    // xư lý profile validate
    const [objProfile, setObjProfile] = useState({});

    function checkObjProfile() {
        const profileObj = {};
        if (isEmpty(name)) {
            profileObj.name = 'Please input your phone';
        }
        if (isEmpty(phone)) {
            profileObj.phone = 'Please input your phone';
        } else {
            if (isNaN(phone)) {
                profileObj.phone = 'Incorrect phone number';
            }
        }
        if (isEmpty(address)) {
            profileObj.address = 'Please input your address';
        }
        if (isEmpty(city)) {
            profileObj.city = 'Please input your city';
        }
        if (isEmpty(country)) {
            profileObj.country = 'Please input your country';
        }
        setObjProfile(profileObj);
        if (Object.keys(profileObj).length > 0) return false;
        return true;
    }
    // xử lý login validate profile upload
    const [objFormPass, setObjFromPass] = useState({});
    function checkPassword() {
        const passObj = {};
        if (isEmpty(oldPassword)) {
            passObj.oldPassword = 'Vui lòng nhập mật khẩu cũ của bạn';
        }
        if (isEmpty(password)) {
            passObj.password = 'Vui lòng nhập mật khẩu';
        } else {
            if (password.length < 6) {
                passObj.password = 'Mật khẩu phải có ít nhất 6 ký tự';
            }
        }
        if (isEmpty(confirmPassword)) {
            passObj.confirmPassword = 'Vui lòng xác nhận mật khẩu mới';
        } else {
            if (confirmPassword.length < 6) {
                passObj.confirmPassword = 'Mật khẩu phải có ít nhất 6 ký tự';
            } else {
                if (password !== confirmPassword) {
                    passObj.confirmPassword = 'Mật khẩu đã nhập không chính xác';
                }
            }
        }
        setObjFromPass(passObj);
        if (Object.keys(passObj).length > 0) return false;
        return true;
    }

    useEffect(() => {
        if (!toast.isActive(toastId.current)) {
            if (updatesuccessPass === true) {
                toastId.current = toast.success('Mật khẩu cập nhật thành công');
                dispatch({ type: USER_UPDATE_PROFILE_RESET });
            }
        }
    }, [dispatch, updatesuccessPass]);

    useEffect(() => {
        if (updatesuccess) {
            toast.success('Cập nhật thông tin thành công');
            dispatch({ type: USER_UPDATE_PROFILE_RESET });
        }
    }, [dispatch, updatesuccess]);

    useEffect(() => {
        if (errorProfile === 'account lock up') {
            toast.error('Tài khoản của bạn đã bị khóa');
            dispatch({ type: USER_UPDATE_PROFILE_RESET });
        }
        if (errorProfile !== undefined && errorProfile !== 'account lock up') {
            toast.error('Cập nhật không thành công');
            dispatch({ type: USER_UPDATE_PROFILE_RESET });
        }
    }, [dispatch, errorProfile]);
    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setPhone(user.phone);
            setAddress(user.address);
            setCity(user.city);
            setCountry(user.country);
            setImage(user.image);
        }
        if (errorProfile) {
            toastId.current = toast.error(error);
        }
    }, [dispatch, user, successDetail]);

    const submitUpdatePassword = (e) => {
        e.preventDefault();
        if (!checkPassword()) return; // check funtion check pass để kiểm tra xem có các trường bị rổng hay không
        //, image
        dispatch(updateUserPassword({ id: user._id, oldPassword, password }));

        setOldPassword('');
        setPassword('');
        setConfirmPassword('');
    };

    //port avatar
    const [url, setUrl] = useState();
    const [imgAvatar, setImgAvatar] = useState();
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [rotation, setRotation] = useState(0);
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);
    const [fileHinh, setFileHinh] = useState();

    const showCroppedImage = useCallback(async () => {
        try {
            // nhận vào 1 object url image
            const croppedImage = await getCroppedImg(imgAvatar, croppedAreaPixels, rotation);
            let response = await fetch(croppedImage);
            let data = await response.blob();
            let metadata = {
                type: 'image/jpeg',
            };
            // let newFile = new File([data], 'test.jpg', metadata);
            let newFile = new File([data], `${fileHinh.name}`, metadata);
            // lưu vào một file
            // setFile(newFile);
            setImage(newFile);
            setCheckImage(false);
            setCheckFile(true);
        } catch (e) {
            console.error(e);
        }
    }, [croppedAreaPixels, rotation]);

    // ================ đổi input = seclct
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

    // ================ đổi input = seclct
    const submitUpdateProfile = (e) => {
        e.preventDefault();
        if (!checkObjProfile()) return;
        // email,
        let userInforNeedUpdate = new FormData();
        userInforNeedUpdate.append('id', user._id);
        userInforNeedUpdate.append('name', name);
        userInforNeedUpdate.append('phone', phone);
        userInforNeedUpdate.append('country', country);
        userInforNeedUpdate.append('city', city);
        userInforNeedUpdate.append('address', address);
        userInforNeedUpdate.append('image', image);
        dispatch(updateUserProfile(userInforNeedUpdate));
    };
    return (
        <>
            {/* <Toast /> */}
            {visible && (
                <Alert
                    message="Cập nhật thông tin thành công"
                    type="success"
                    closable
                    onClose={handleAlertClose}
                    afterClose={handleClose}
                    showIcon
                />
            )}
            {error && <Message variant="alert-danger">{error}</Message>}
            {loading && <Loading />}
            {/* {updateLoading && <Loading />} */}
            <div className="row form-container">
                {/*Update profile*/}
                {/* nut check radio */}
                <div className="radio-check">
                    <from className="radio-from">
                        <div className="radio-from__flex">
                            <label for="profile" className={Number(checkbox) === 0 ? 'color' : ''}>
                                Thông Tin
                            </label>
                            <input
                                id="profile"
                                style={{ display: 'none' }}
                                name="checkProfilePass"
                                type="radio"
                                onClick={checkProfile}
                            ></input>
                        </div>
                        <div className="radio-from__flex">
                            <label for="pass" className={Number(checkbox) === 1 ? 'color' : ''}>
                                Đổi Mật Khẩu
                            </label>
                            <input
                                id="pass"
                                style={{ display: 'none' }}
                                name="checkProfilePass"
                                type="radio"
                                onClick={checkSetPassword}
                            ></input>
                        </div>
                    </from>
                </div>
                <div
                    ref={refProfile}
                    className={uploadProfile ? 'col-lg-8 col-md-8 col-sm-8 color' : 'col-lg-8 col-md-8 col-sm-8'}
                    style={{ display: uploadProfile ? 'block' : 'none' }}
                >
                    <form className="row  form-container" onSubmit={submitUpdateProfile}>
                        <div className="col-md-12">
                            <div className="form">
                                <label for="account-fn">Họ tên</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    // required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <p className="noti-validate">{objProfile.name}</p>
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div className="form">
                                <label for="account-email">E-mail</label>
                                <input
                                    className="form-control"
                                    type="email"
                                    disabled
                                    value={email}
                                    // required
                                    // onChange={(e) => setEmail(e.target.value)}
                                />
                                <p className="noti-validate"></p>
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div className="form">
                                <label>Số điện thoại</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={phone}
                                    // required
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                                <p className="noti-validate">{objProfile.phone}</p>
                            </div>
                        </div>

                        {/* ĐỔI TỪ ĐÂY */}
                        <div
                            className="col-md-12"
                            style={{
                                marginBottom: '32px',
                            }}
                        >
                            <div className="form">
                                <label>Tỉnh/Thành phố</label>
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
                            </div>
                        </div>
                        <div
                            className="col-md-12"
                            style={{
                                marginBottom: '32px',
                            }}
                        >
                            <div className="form">
                                <label>Huyện/Quận</label>
                                <select onChange={handleChooseCiTy} className="carSelect" onClick={GetDefaulDistrict}>
                                    <option disabled selected hidden>
                                        {city}
                                    </option>
                                    {distric?.districts?.map((dis, index) => {
                                        return <option key={index}>{dis.name}</option>;
                                    })}
                                </select>
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div className="form">
                                <label>Đường/Hẻm - Thôn/Phường</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={address}
                                    // required
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                                <p className="noti-validate">{objProfile.address}</p>
                            </div>
                        </div>

                        <div className="button-submit">
                            <button style={{ backgroundColor: '#00483d' }} type="submit">
                                Cập nhật hồ sơ
                            </button>
                        </div>
                    </form>
                </div>

                {/*Update password*/}
                <div
                    ref={refSetPassword}
                    className={uploadPassword ? 'col-lg-8 col-md-8 col-sm-8 color' : 'col-lg-8 col-md-8 col-sm-8'}
                    style={{ display: uploadPassword ? 'block' : 'none' }}
                >
                    {/* dòng này sơn nó in ra thống báo lỗi sơn nhớ sửa lại nhá */}
                    {errorProfile && <Message variant="alert-danger">{errorProfile}</Message>}
                    <form className="row  form-container" onSubmit={submitUpdatePassword}>
                        <div className="col-md-12">
                            <div className="form">
                                <label for="account-pass">Mật khẩu cũ</label>
                                <input
                                    className="form-control"
                                    type="password"
                                    value={oldPassword}
                                    onChange={(e) => {
                                        objFormPass.oldPassword = ' ';
                                        setOldPassword(e.target.value);
                                    }}
                                />
                                <p className="noti-validate">{objFormPass.oldPassword}</p>
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div className="form">
                                <label for="account-pass">Mật khẩu mới</label>
                                <input
                                    className="form-control"
                                    type="password"
                                    value={password}
                                    onChange={(e) => {
                                        objFormPass.password = ' ';
                                        setPassword(e.target.value);
                                    }}
                                />
                                <p className="noti-validate">{objFormPass.password}</p>
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div className="form">
                                <label for="account-confirm-pass">Xác nhận mật khẩu</label>
                                <input
                                    className="form-control"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => {
                                        objFormPass.confirmPassword = ' ';
                                        setConfirmPassword(e.target.value);
                                    }}
                                />
                                <p className="noti-validate">{objFormPass.confirmPassword}</p>
                            </div>
                        </div>

                        <div className="button-submit">
                            <button style={{ backgroundColor: '#00483d' }} type="submit">
                                Cập nhật mật khẩu
                            </button>
                        </div>
                    </form>
                </div>

                <div className="col-lg-4 col-md-4 col-sm-4">
                    <div
                        className="col-lg-12 col-md-12 col-sm-12 text-center display_none"
                        style={checkFile === true ? {} : { display: 'none' }}
                    >
                        <img
                            src={
                                image === undefined || typeof image === 'object'
                                    ? imgAvatar === undefined
                                        ? imageDefaul
                                        : imgAvatar
                                    : image
                            }
                            style={{
                                height: '120px',
                                width: '120px',
                                borderRadius: '100%',
                                objectFit: 'cover',
                                flexShrink: '0',
                            }}
                            alt=""
                        />
                        <div className="text-center">
                            <input
                                id="id_file"
                                type="file"
                                style={{ display: 'none' }}
                                onChange={(e) => {
                                    setImgAvatar(URL.createObjectURL(e.target.files[0]));
                                    setCheckFile(false);
                                    setCheckImage(true);
                                    setFileHinh(e.target.files[0]);
                                }}
                            ></input>
                            <label
                                for="id_file"
                                style={{
                                    marginTop: '5px',
                                    padding: '5px 10px',
                                    backgroundColor: '#eb7914',
                                    borderRadius: '3px',
                                    cursor: 'pointer',
                                    color: '#fff',
                                }}
                            >
                                Chọn ảnh
                            </label>
                        </div>
                    </div>
                    <div
                        className="col-lg-12 col-md-12 col-sm-12 text-center display_none"
                        style={
                            checkImage === true
                                ? { position: 'absolute', height: '230px', width: '230px', background: '#cccccc42' }
                                : {
                                      display: 'none',
                                      position: 'absolute',
                                      height: '230px',
                                      width: '230px',
                                      background: '#cccccc42',
                                  }
                        }
                    >
                        <div>
                            <Cropper
                                image={imgAvatar}
                                crop={crop}
                                rotation={rotation}
                                zoom={zoom}
                                aspect={4 / 3}
                                onCropChange={setCrop}
                                onRotationChange={setRotation}
                                onCropComplete={onCropComplete}
                                onZoomChange={setZoom}
                            />
                        </div>
                        <div>
                            <Button
                                onClick={showCroppedImage}
                                variant="contained"
                                color="primary"
                                className="save-image"
                            >
                                Lưu ảnh
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfileTabs;
