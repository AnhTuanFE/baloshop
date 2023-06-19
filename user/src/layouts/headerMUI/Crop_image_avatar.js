import { Box, Button } from '@mui/material';
import { useEffect, useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { useDispatch } from 'react-redux';
import getCroppedImg from '~/components/editAvatar/cropImage';
import { imageDefaul } from '~/utils/data';
import { updateUserProfile } from '~/redux/Actions/userActions';

function Crop_image_avatar({ user }) {
    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const [checkFile, setCheckFile] = useState(true);
    const [checkImage, setCheckImage] = useState(false);
    const [imgAvatar, setImgAvatar] = useState();
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [rotation, setRotation] = useState(0);
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [fileHinh, setFileHinh] = useState();
    const [handleUpdateImage, setHandleUpdateImage] = useState(false);

    const [image, setImage] = useState();
    const [nameImage, setNameImage] = useState();

    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            setImage(user.image?.urlImageCloudinary);
            setNameImage(user.image?.idImageCloudinary);
        }
    }, [dispatch, user]);

    const showCroppedImage = useCallback(async () => {
        try {
            // nhận vào 1 object url image
            const croppedImage = await getCroppedImg(imgAvatar, croppedAreaPixels, rotation);
            let response = await fetch(croppedImage);
            let data = await response.blob();
            let metadata = {
                type: 'image/jpeg',
            };
            let newFile = new File([data], `${fileHinh.name}`, metadata);
            setImage(newFile);
            setCheckImage(false);
            setCheckFile(true);
            setHandleUpdateImage(true);
        } catch (e) {
            console.error(e);
        }
    }, [croppedAreaPixels, rotation]);

    const submitUpdateProfile = () => {
        let userInforNeedUpdate = new FormData();
        userInforNeedUpdate.append('id', user._id);
        userInforNeedUpdate.append('image', image);
        userInforNeedUpdate.append('nameImage', nameImage);

        dispatch(updateUserProfile(userInforNeedUpdate));
    };

    useEffect(() => {
        if (handleUpdateImage) {
            submitUpdateProfile();
            setHandleUpdateImage(false);
        }
    }, [handleUpdateImage]);

    return (
        <Box>
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
                    <Button onClick={showCroppedImage} variant="contained" color="primary" className="save-image">
                        Lưu ảnh
                    </Button>
                </div>
            </div>
        </Box>
    );
}

export default Crop_image_avatar;
