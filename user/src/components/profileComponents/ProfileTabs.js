// import { useEffect, useState, useRef, useCallback } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import isEmpty from 'validator/lib/isEmpty';

// import Cropper from 'react-easy-crop';
// import { Button, Autocomplete, TextField } from '@mui/material';

// import { updateUserPassword, updateUserProfile } from '~/redux/Actions/userActions';
// import { USER_UPDATE_PROFILE_RESET } from '~/redux/Constants/UserContants';
// import { getListProvincesAction } from '~/redux/Actions/userActions';
// import { notification } from 'antd';

// import Message from '../HomeComponent/LoadingError/Error';
// import Loading from '../HomeComponent/LoadingError/Loading';

// import getCroppedImg from '../editAvatar/cropImage';
// import { imageDefaul } from '~/utils/data';

// import '../editAvatar/style.css';
// import './ProfileTabs.css';

// // type NotificationType = 'success' | 'info' | 'warning' | 'error';
// const ProfileTabs = () => {
//     const [api, contextHolder] = notification.useNotification();
//     const openNotification = (placement, notify, type) => {
//         api[type]({
//             message: `Thông báo `,
//             description: `${notify}`,
//             placement,
//         });
//     };

//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [phone, setPhone] = useState('');
//     const [oldPassword, setOldPassword] = useState('');
//     const [password, setPassword] = useState('');

//     const [city, setCity] = useState(''); //tp
//     const [distric, setDistric] = useState(''); //quận huyện
//     const [districtOptions, setDistrictOptions] = useState([]);
//     const [ward, setWard] = useState(''); // xá phường
//     const [wardOptions, setWardOptions] = useState([]);
//     const [address, setAddress] = useState(''); // địa chỉ chi tiết

//     const [image, setImage] = useState();
//     const [nameImage, setNameImage] = useState();

//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [uploadProfile, setUploadProfile] = useState(true); //ghi chú
//     const [uploadPassword, setUploadPassword] = useState(false); //ghi chú
//     const [checkbox, setCheckbox] = useState('0');
//     const [checkFile, setCheckFile] = useState(true);
//     const [checkImage, setCheckImage] = useState(false);
//     const refProfile = useRef(); /// ghi chú
//     const refSetPassword = useRef(); /// ghi chú

//     const dispatch = useDispatch();

//     const userDetails = useSelector((state) => state.userDetails);
//     const { loading, error, user, success: successDetail } = userDetails;

//     const userUpdateProfile = useSelector((state) => state.userUpdateProfile);

//     const {
//         successPass: updatesuccessPass,
//         success: updatesuccess,
//         loading: updateLoading,
//         error: errorProfile,
//     } = userUpdateProfile;

//     const listProvince = useSelector((state) => state.provincesVietNam);
//     useEffect(() => {
//         dispatch(getListProvincesAction());
//     }, []);

//     const DataProvinces = listProvince.province;

//     function checkProfile() {
//         let x = Number(checkbox);
//         if (x === 0) {
//             setUploadProfile(true);
//             setUploadPassword(false);
//             setCheckbox('0');
//         } else {
//             setUploadProfile(true);
//             setUploadPassword(false);
//             setCheckbox('0');
//         }
//     }
//     function checkSetPassword() {
//         let y = Number(checkbox);
//         if (y === 0) {
//             setUploadProfile(false);
//             setUploadPassword(true);
//             setCheckbox('1');
//         } else {
//             setUploadProfile(false);
//             setUploadPassword(true);
//             setCheckbox('1');
//         }
//     }
//     // xư lý profile validate
//     const [objProfile, setObjProfile] = useState({});

//     function checkObjProfile() {
//         const profileObj = {};
//         if (isEmpty(name)) {
//             profileObj.name = 'Please input your phone';
//         }
//         if (isEmpty(phone)) {
//             profileObj.phone = 'Please input your phone';
//         } else {
//             if (isNaN(phone)) {
//                 profileObj.phone = 'Incorrect phone number';
//             }
//         }
//         if (isEmpty(address)) {
//             profileObj.address = 'Please input your address';
//         }
//         if (isEmpty(city)) {
//             profileObj.city = 'Please input your city';
//         }
//         setObjProfile(profileObj);
//         if (Object.keys(profileObj).length > 0) return false;
//         return true;
//     }
//     //=================================================================================================
//     // xử lý login validate profile upload
//     const [objFormPass, setObjFromPass] = useState({});
//     function checkPassword() {
//         const passObj = {};
//         if (isEmpty(oldPassword)) {
//             passObj.oldPassword = 'Vui lòng nhập mật khẩu cũ của bạn';
//         }
//         if (isEmpty(password)) {
//             passObj.password = 'Vui lòng nhập mật khẩu';
//         } else {
//             if (password.length < 6) {
//                 passObj.password = 'Mật khẩu phải có ít nhất 6 ký tự';
//             }
//         }
//         if (isEmpty(confirmPassword)) {
//             passObj.confirmPassword = 'Vui lòng xác nhận mật khẩu mới';
//         } else {
//             if (confirmPassword.length < 6) {
//                 passObj.confirmPassword = 'Mật khẩu phải có ít nhất 6 ký tự';
//             } else {
//                 if (password !== confirmPassword) {
//                     passObj.confirmPassword = 'Mật khẩu đã nhập không chính xác';
//                 }
//             }
//         }
//         setObjFromPass(passObj);
//         if (Object.keys(passObj).length > 0) return false;
//         return true;
//     }
//     //=================================================================================================

//     useEffect(() => {
//         if (updatesuccessPass === true) {
//             openNotification('top', 'Mật khẩu cập nhật thành công', 'success');

//             dispatch({ type: USER_UPDATE_PROFILE_RESET });
//         }
//     }, [dispatch, updatesuccessPass]);

//     useEffect(() => {
//         if (updatesuccess) {
//             openNotification('top', 'Cập nhật thông tin thành công', 'success');
//             dispatch({ type: USER_UPDATE_PROFILE_RESET });
//         }
//     }, [dispatch, updatesuccess]);

//     useEffect(() => {
//         if (errorProfile === 'account lock up') {
//             openNotification('top', 'Tài khoản của bạn đã bị khóa', 'error');

//             dispatch({ type: USER_UPDATE_PROFILE_RESET });
//         }
//         if (errorProfile !== undefined && errorProfile !== 'account lock up') {
//             openNotification('top', 'Cập nhật không thành công', 'error');
//             dispatch({ type: USER_UPDATE_PROFILE_RESET });
//         }
//     }, [dispatch, errorProfile]);
//     //====================================================================================================
//     useEffect(() => {
//         if (user) {
//             setName(user.name);
//             setEmail(user.email);
//             setPhone(user.phone);
//             setCity(user.city);
//             setDistric(user.distric);
//             setWard(user.ward);
//             setAddress(user.address);
//             setImage(user.image?.urlImageCloudinary);
//             setNameImage(user.image?.idImageCloudinary);
//         }
//         if (errorProfile) {
//             openNotification('top', 'Lỗi thông tin tài khoản', 'error');
//         }
//     }, [dispatch, user, successDetail]);

//     const submitUpdatePassword = (e) => {
//         e.preventDefault();
//         if (!checkPassword()) return; // check funtion check pass để kiểm tra xem có các trường bị rổng hay không
//         dispatch(updateUserPassword({ id: user._id, oldPassword, password }));
//         setOldPassword('');
//         setPassword('');
//         setConfirmPassword('');
//     };

//     //port avatar
//     const [imgAvatar, setImgAvatar] = useState();
//     const [crop, setCrop] = useState({ x: 0, y: 0 });
//     const [rotation, setRotation] = useState(0);
//     const [zoom, setZoom] = useState(1);
//     const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
//     const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
//         setCroppedAreaPixels(croppedAreaPixels);
//     }, []);
//     const [fileHinh, setFileHinh] = useState();

//     const showCroppedImage = useCallback(async () => {
//         try {
//             // nhận vào 1 object url image
//             const croppedImage = await getCroppedImg(imgAvatar, croppedAreaPixels, rotation);
//             let response = await fetch(croppedImage);
//             let data = await response.blob();
//             let metadata = {
//                 type: 'image/jpeg',
//             };
//             let newFile = new File([data], `${fileHinh.name}`, metadata);
//             setImage(newFile);
//             setCheckImage(false);
//             setCheckFile(true);
//         } catch (e) {
//             console.error(e);
//         }
//     }, [croppedAreaPixels, rotation]);

//     const submitUpdateProfile = (e) => {
//         e.preventDefault();
//         if (!checkObjProfile()) return;
//         let userInforNeedUpdate = new FormData();
//         userInforNeedUpdate.append('id', user._id);
//         userInforNeedUpdate.append('name', name);
//         userInforNeedUpdate.append('phone', phone);
//         userInforNeedUpdate.append('city', city);
//         userInforNeedUpdate.append('distric', distric);
//         userInforNeedUpdate.append('ward', ward);
//         userInforNeedUpdate.append('address', address);
//         userInforNeedUpdate.append('image', image);
//         userInforNeedUpdate.append('nameImage', nameImage);

//         dispatch(updateUserProfile(userInforNeedUpdate));
//     };

//     // =========================================================================

//     const optionsAntD_city = [];
//     const optionsAntD_distric = [];
//     const optionsAntD_ward = [];

//     const onChange_city = (value) => {
//         setCity(value);
//         const infoCity = DataProvinces.find((arr) => {
//             return arr.name == value.toString();
//         });
//         setDistric('');
//         setWard('');
//         setDistrictOptions(infoCity.districts);
//     };

//     function findInfoCityByName(arr, name) {
//         for (let i = 0; i < arr.length; i++) {
//             if (arr[i].name === name) {
//                 return arr[i];
//             } else if (arr[i].districts) {
//                 const found = findInfoCityByName(arr[i].districts, name);
//                 if (found) {
//                     return found;
//                 }
//             }
//         }
//         return null;
//     }

//     const onChange_distric = (value) => {
//         const infoDistric = findInfoCityByName(DataProvinces, value);
//         setWardOptions(infoDistric.wards);
//         setDistric(value);
//         setWard('');
//     };

//     const onChange_ward = (value) => {
//         setWard(value);
//     };

//     // lấy dữ liệu từ api và chuyển option cho thành dữ liệu cho MUI nhận được
//     if (DataProvinces) {
//         for (let i = 0; i < DataProvinces.length; i++) {
//             optionsAntD_city.push({
//                 value: DataProvinces[i].name,
//                 label: DataProvinces[i].name,
//             });
//         }
//     }

//     if (districtOptions.length > 1) {
//         for (let i = 0; i < districtOptions?.length; i++) {
//             optionsAntD_distric.push({
//                 value: districtOptions[i]?.name,
//                 label: districtOptions[i]?.name,
//             });
//         }
//     }

//     if (city) {
//         const infoDistric = findInfoCityByName(DataProvinces, city);
//         const arrDistrictsTemp = infoDistric?.districts;
//         for (let i = 0; i < arrDistrictsTemp?.length; i++) {
//             optionsAntD_distric.push({
//                 value: arrDistrictsTemp[i]?.name,
//                 label: arrDistrictsTemp[i]?.name,
//             });
//         }
//         const infoWards = findInfoCityByName(DataProvinces, distric);
//         const arrWardsTemp = infoWards?.wards;
//         for (let i = 0; i < arrWardsTemp?.length; i++) {
//             optionsAntD_ward.push({
//                 value: arrWardsTemp[i]?.name,
//                 label: arrWardsTemp[i]?.name,
//             });
//         }
//     }

//     if (wardOptions.length > 1) {
//         for (let i = 0; i < wardOptions?.length; i++) {
//             optionsAntD_ward.push({
//                 value: wardOptions[i]?.name,
//                 label: wardOptions[i]?.name,
//             });
//         }
//     }

//     return (
//         <>
//             {contextHolder}
//             {error && <Message variant="alert-danger">{error}</Message>}
//             {loading && <Loading />}
//             {updateLoading && <Loading />}

//             <div className="row form-container">
//                 <div className="radio-check">
//                     <from className="radio-from">
//                         <div className="radio-from__flex">
//                             <label for="profile" className={Number(checkbox) === 0 ? 'color' : ''}>
//                                 Thông Tin
//                             </label>
//                             <input
//                                 id="profile"
//                                 style={{ display: 'none' }}
//                                 name="checkProfilePass"
//                                 type="radio"
//                                 onClick={checkProfile}
//                             ></input>
//                         </div>
//                         <div className="radio-from__flex">
//                             <label for="pass" className={Number(checkbox) === 1 ? 'color' : ''}>
//                                 Đổi Mật Khẩu
//                             </label>
//                             <input
//                                 id="pass"
//                                 style={{ display: 'none' }}
//                                 name="checkProfilePass"
//                                 type="radio"
//                                 onClick={checkSetPassword}
//                             ></input>
//                         </div>
//                     </from>
//                 </div>
//                 <div
//                     ref={refProfile}
//                     className={uploadProfile ? 'col-lg-8 col-md-8 col-sm-8 color' : 'col-lg-8 col-md-8 col-sm-8'}
//                     style={{ display: uploadProfile ? 'block' : 'none' }}
//                 >
//                     <form className="row  form-container" onSubmit={submitUpdateProfile}>
//                         <div className="col-md-12">
//                             <div className="form">
//                                 <label for="account-fn">Họ tên</label>
//                                 <TextField
//                                     className="text_field"
//                                     value={name}
//                                     id="outlined-basic"
//                                     fullWidth
//                                     label="Họ tên"
//                                     variant="outlined"
//                                     onChange={(e) => {
//                                         setName(e.target.value);
//                                     }}
//                                 />
//                                 <p className="noti-validate">{objProfile.name}</p>
//                             </div>
//                         </div>

//                         <div className="col-md-12">
//                             <div className="form">
//                                 <label for="account-email">E-mail</label>
//                                 <TextField
//                                     className="text_field"
//                                     value={email}
//                                     id="outlined-basic"
//                                     fullWidth
//                                     label="email"
//                                     variant="outlined"
//                                     // onChange={(e) => {
//                                     //     setEmail(e.target.value);
//                                     // }}
//                                 />
//                                 <p className="noti-validate"></p>
//                             </div>
//                         </div>

//                         <div className="col-md-12">
//                             <div className="form">
//                                 <label>Số điện thoại</label>
//                                 <TextField
//                                     className="text_field"
//                                     value={phone}
//                                     id="outlined-basic"
//                                     fullWidth
//                                     label="Số điện thoại"
//                                     variant="outlined"
//                                     onChange={(e) => {
//                                         setPhone(e.target.value);
//                                     }}
//                                 />
//                                 <p className="noti-validate">{objProfile.phone}</p>
//                             </div>
//                         </div>

//                         <div className="col-md-12">
//                             <div className="form">
//                                 <label>Tỉnh/Thành phố</label>
//                                 <Autocomplete
//                                     className="autocomplete"
//                                     disablePortal
//                                     id="combo-box-demo"
//                                     options={optionsAntD_city}
//                                     value={city}
//                                     onChange={(e) => {
//                                         onChange_city(e.target.outerText);
//                                     }}
//                                     sx={{ width: 500 }}
//                                     renderInput={(params) => <TextField {...params} label="Tỉnh / Thành phố" />}
//                                 />
//                             </div>
//                         </div>
//                         <div className="col-md-12">
//                             <div className="form">
//                                 <label>Quận/Huyện</label>
//                                 <Autocomplete
//                                     className="autocomplete"
//                                     disablePortal
//                                     id="combo-box-demo"
//                                     options={optionsAntD_distric}
//                                     value={distric}
//                                     onChange={(e) => {
//                                         onChange_distric(e.target.outerText);
//                                     }}
//                                     sx={{ width: 500 }}
//                                     renderInput={(params) => <TextField {...params} label="Quận/Huyện" />}
//                                 />
//                             </div>
//                         </div>
//                         <div className="col-md-12">
//                             <div className="form">
//                                 <label className="label_title">Xã/Phường</label>
//                                 <Autocomplete
//                                     className="autocomplete"
//                                     disablePortal
//                                     id="combo-box-demo"
//                                     value={ward}
//                                     options={optionsAntD_ward}
//                                     onChange={(e) => {
//                                         onChange_ward(e.target.outerText);
//                                     }}
//                                     sx={{ width: 500 }}
//                                     renderInput={(params) => <TextField {...params} label="Xã/Phường" />}
//                                 />
//                             </div>
//                         </div>
//                         <div className="col-md-12">
//                             <div className="form">
//                                 <label>Đường/Hẻm - Thôn/Phường</label>
//                                 <TextField
//                                     className="text_field"
//                                     value={address}
//                                     id="outlined-basic"
//                                     fullWidth
//                                     label="Đường/Hẻm - Thôn/Phường"
//                                     variant="outlined"
//                                     onChange={(e) => {
//                                         setAddress(e.target.value);
//                                     }}
//                                 />
//                             </div>
//                         </div>
//                         <div className="button-submit">
//                             <button style={{ backgroundColor: 'var(--main-color)' }} type="submit">
//                                 Cập nhật hồ sơ
//                             </button>
//                         </div>
//                     </form>
//                 </div>

//                 {/*Update password*/}
//                 <div
//                     ref={refSetPassword}
//                     className={uploadPassword ? 'col-lg-8 col-md-8 col-sm-8 color' : 'col-lg-8 col-md-8 col-sm-8'}
//                     style={{ display: uploadPassword ? 'block' : 'none' }}
//                 >
//                     {/* dòng này sơn nó in ra thống báo lỗi sơn nhớ sửa lại nhá */}
//                     {errorProfile && <Message variant="alert-danger">{errorProfile}</Message>}
//                     <form className="row  form-container" onSubmit={submitUpdatePassword}>
//                         <div className="col-md-12">
//                             <div className="form">
//                                 <label for="account-pass">Mật khẩu cũ</label>
//                                 <input
//                                     className="form-control"
//                                     type="password"
//                                     value={oldPassword}
//                                     onChange={(e) => {
//                                         objFormPass.oldPassword = ' ';
//                                         setOldPassword(e.target.value);
//                                     }}
//                                 />
//                                 <p className="noti-validate">{objFormPass.oldPassword}</p>
//                             </div>
//                         </div>

//                         <div className="col-md-12">
//                             <div className="form">
//                                 <label for="account-pass">Mật khẩu mới</label>
//                                 <input
//                                     className="form-control"
//                                     type="password"
//                                     value={password}
//                                     onChange={(e) => {
//                                         objFormPass.password = ' ';
//                                         setPassword(e.target.value);
//                                     }}
//                                 />
//                                 <p className="noti-validate">{objFormPass.password}</p>
//                             </div>
//                         </div>

//                         <div className="col-md-12">
//                             <div className="form">
//                                 <label for="account-confirm-pass">Xác nhận mật khẩu</label>
//                                 <input
//                                     className="form-control"
//                                     type="password"
//                                     value={confirmPassword}
//                                     onChange={(e) => {
//                                         objFormPass.confirmPassword = ' ';
//                                         setConfirmPassword(e.target.value);
//                                     }}
//                                 />
//                                 <p className="noti-validate">{objFormPass.confirmPassword}</p>
//                             </div>
//                         </div>

//                         <div className="button-submit">
//                             <button style={{ backgroundColor: 'var(--main-color)' }} type="submit">
//                                 Cập nhật mật khẩu
//                             </button>
//                         </div>
//                     </form>
//                 </div>

//                 <div className="col-lg-4 col-md-4 col-sm-4">
//                     <div
//                         className="col-lg-12 col-md-12 col-sm-12 text-center display_none"
//                         style={checkFile === true ? {} : { display: 'none' }}
//                     >
//                         <img
//                             src={
//                                 image === undefined || typeof image === 'object'
//                                     ? imgAvatar === undefined
//                                         ? imageDefaul
//                                         : imgAvatar
//                                     : image
//                             }
//                             style={{
//                                 height: '120px',
//                                 width: '120px',
//                                 borderRadius: '100%',
//                                 objectFit: 'cover',
//                                 flexShrink: '0',
//                             }}
//                             alt=""
//                         />
//                         <div className="text-center">
//                             <input
//                                 id="id_file"
//                                 type="file"
//                                 style={{ display: 'none' }}
//                                 onChange={(e) => {
//                                     setImgAvatar(URL.createObjectURL(e.target.files[0]));
//                                     setCheckFile(false);
//                                     setCheckImage(true);
//                                     setFileHinh(e.target.files[0]);
//                                 }}
//                             ></input>
//                             <label
//                                 for="id_file"
//                                 style={{
//                                     marginTop: '5px',
//                                     padding: '5px 10px',
//                                     backgroundColor: '#eb7914',
//                                     borderRadius: '3px',
//                                     cursor: 'pointer',
//                                     color: '#fff',
//                                 }}
//                             >
//                                 Chọn ảnh
//                             </label>
//                         </div>
//                     </div>
//                     <div
//                         className="col-lg-12 col-md-12 col-sm-12 text-center display_none"
//                         style={
//                             checkImage === true
//                                 ? { position: 'absolute', height: '230px', width: '230px', background: '#cccccc42' }
//                                 : {
//                                       display: 'none',
//                                       position: 'absolute',
//                                       height: '230px',
//                                       width: '230px',
//                                       background: '#cccccc42',
//                                   }
//                         }
//                     >
//                         <div>
//                             <Cropper
//                                 image={imgAvatar}
//                                 crop={crop}
//                                 rotation={rotation}
//                                 zoom={zoom}
//                                 aspect={4 / 3}
//                                 onCropChange={setCrop}
//                                 onRotationChange={setRotation}
//                                 onCropComplete={onCropComplete}
//                                 onZoomChange={setZoom}
//                             />
//                         </div>
//                         <div>
//                             <Button
//                                 onClick={showCroppedImage}
//                                 variant="contained"
//                                 color="primary"
//                                 className="save-image"
//                             >
//                                 Lưu ảnh
//                             </Button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default ProfileTabs;
