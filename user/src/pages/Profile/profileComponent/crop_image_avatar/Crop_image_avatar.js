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

    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            setImage(user?.image);
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
        // userInforNeedUpdate.append('id', user._id);
        userInforNeedUpdate.append('image', image);

        dispatch(updateUserProfile(userInforNeedUpdate));
    };

    useEffect(() => {
        if (handleUpdateImage) {
            submitUpdateProfile();
            setHandleUpdateImage(false);
        }
    }, [handleUpdateImage]);

    return (
        <div className="">
            <div
                className="col-lg-12 col-md-12 col-sm-12 display_none "
                style={checkFile === true ? {} : { display: 'none' }}
            >
                <div className="">
                    <img
                        src={
                            image === undefined || typeof image === 'object'
                                ? imgAvatar === undefined
                                    ? imageDefaul
                                    : imgAvatar
                                : image
                        }
                        className=" h-32 w-32 flex-shrink-0 rounded-[100%] object-cover"
                        alt="avatar"
                    />
                    <div className="">
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
                            className="mt-2 cursor-pointer rounded-md bg-[var(--main-color)] pb-1 pl-8 pr-8 pt-1 text-fuchsia-50 hover:bg-[--main-color-hover]"
                        >
                            Đổi avatar
                        </label>
                    </div>
                </div>
            </div>

            <div className="flex justify-center">
                <div
                    className="text-center"
                    style={
                        checkImage === true
                            ? {
                                  position: 'absolute',
                                  height: '200px',
                                  width: '200px',
                                  background: '#cccccc42',
                                  //   marginRight: '100px',
                              }
                            : {
                                  display: 'none',
                                  //   position: 'absolute',
                                  //   height: '200px',
                                  //   width: '200px',
                                  //   background: '#cccccc42',
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
                            // save-image
                            className=" !bg-[var(--main-color)] px-2 py-1 hover:!bg-[var(--main-color-hover)]"
                        >
                            Lưu ảnh
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Crop_image_avatar;
