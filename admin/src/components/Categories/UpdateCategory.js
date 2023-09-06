import { useEffect, useState, memo } from 'react';
import Toast from '../LoadingError/Toast';
import Loading from '../LoadingError/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateCurrentCategory } from '~/Redux/Actions/categoryActions';
import { toast } from 'react-toastify';
import { CATEGORY_UPDATE_RESET } from '~/Redux/Constants/CategoryConstants';

const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
};
const UpdateCategory = ({ currentCategory }) => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [idCategory, setIdCategory] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const lcategories = useSelector((state) => state.CategoryList);
    const { categories } = lcategories;

    const notifiUpdateCategory = useSelector((state) => state.CategoryUpdate);
    const { loading, success, error } = notifiUpdateCategory;
    const handleCreateCategory = (e) => {
        e.preventDefault();
        dispatch(UpdateCurrentCategory(idCategory, name, description));
    };
    useEffect(() => {
        if (success) {
            toast.success('Đã cập nhật thành công', ToastObjects);
        }
        if (error) {
            toast.error('Thể loại đã tồn tại', ToastObjects);
        }
        dispatch({ type: CATEGORY_UPDATE_RESET });
    }, [success, error]);
    useEffect(() => {
        setIdCategory(categories[currentCategory]?._id);
        setName(categories[currentCategory]?.name);
        setDescription(categories[currentCategory]?.description);
    }, [currentCategory]);
    return (
        <>
            <Toast />
            <div>
                <form className="form-control d-flex justify-content-between align-items-center">
                    {/* {} <Loading />} */}
                    <div className="mb-4" style={{ width: '25%' }}>
                        <label htmlFor="product_name" className="form-label">
                            Tên
                        </label>
                        <input
                            type="text"
                            placeholder=""
                            style={{ width: '100%', height: '2.5em' }}
                            id="product_name"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        />
                    </div>

                    <div className="mb-4" style={{ width: '50%' }}>
                        <label className="form-label">Mô tả</label>
                        <textarea
                            placeholder="Type here"
                            rows="3"
                            style={{ width: '100%', resize: 'none' }}
                            value={description}
                            onChange={(e) => {
                                setDescription(e.target.value);
                            }}
                        ></textarea>
                    </div>

                    <div>
                        <button className="btn btn-primary" onClick={handleCreateCategory}>
                            Cập nhật
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};
export default memo(UpdateCategory);
