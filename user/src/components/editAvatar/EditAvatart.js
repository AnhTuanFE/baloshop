import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
// import Button from '@material-ui/core/Button';
import { Button } from '@mui/material';
import ImgDialog from './ImgDialog';
import getCroppedImg from './cropImage';
import './style.css';

// import Slider from '@material-ui/core/Slider';
// import Typography from '@material-ui/core/Typography';
// import { withStyles } from '@material-ui/core/styles';

const dogImg = 'https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000';

const EditAvatart = ({ setImage }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [rotation, setRotation] = useState(0);
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);

    // console.log(setImage);
    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const showCroppedImage = useCallback(async () => {
        try {
            const croppedImage = await getCroppedImg(dogImg, croppedAreaPixels, rotation);
            setCroppedImage(croppedImage);
            setImage(croppedImage);
        } catch (e) {
            console.error(e);
        }
    }, [croppedAreaPixels, rotation]);

    const onClose = useCallback(() => {
        setCroppedImage(null);
    }, []);
    return (
        <div style={{ position: 'absolute', height: '300px', width: '300px' }}>
            <div>
                <Cropper
                    image={dogImg}
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
                <Button onClick={showCroppedImage} variant="contained" color="primary">
                    Show Result
                </Button>
            </div>
            <ImgDialog img={croppedImage} onClose={onClose} />
        </div>
    );
};
export default EditAvatart;
