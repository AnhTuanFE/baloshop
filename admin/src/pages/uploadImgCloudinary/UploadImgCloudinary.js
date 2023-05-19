import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import './UploadImgCloudinary.css';

function UploadImgCloudinary() {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState();
    const user = useSelector((state) => state.userLogin);
    const { userInfo } = user;

    const handleSubmitImage = async () => {
        // const config = {
        //     headers: {
        //         Authorization: `Bearer ${userInfo.token}`,
        //     },
        // };
        let formData = new FormData();
        formData.append('title', title);
        formData.append('image', image);
        //, config
        const { data } = await axios.post(`http://localhost:9001/api/uploadimagecloudinary/add`, formData);
    };
    return (
        <div>
            <h1 className="head123">Upload image page</h1>
            <div className="wrap_input">
                <input
                    className="input_item"
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                    type="text"
                    placeholder="tên hình ảnh"
                />
                <input
                    className="input_item"
                    onChange={(e) => {
                        setImage(e.target.files[0]);
                    }}
                    type="file"
                    placeholder="hình ảnh"
                />
            </div>
            <button onClick={handleSubmitImage}>upload</button>
        </div>
    );
}

export default UploadImgCloudinary;
