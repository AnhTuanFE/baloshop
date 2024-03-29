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
    const handleCreateCategory1 = (e) => {
        window.location.reload();
    };
    return (
        <>
            <Toast />
            <div className="col-md-12 col-lg-4">
                <form>
                    {/* {} <Loading />} */}
                    <div className="mb-4">
                        <label htmlFor="product_name" className="form-label">
                            Name
                        </label>
                        <input
                            type="text"
                            placeholder="Type here"
                            className="form-control py-3"
                            id="product_name"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="form-label">Description</label>
                        <textarea
                            placeholder="Type here"
                            className="form-control"
                            rows="4"
                            style={{
                                resize: 'none',
                            }}
                            value={description}
                            onChange={(e) => {
                                setDescription(e.target.value);
                            }}
                        ></textarea>
                    </div>

                    <div className="d-flex justify-content-end warn">
                        <button className="btn btn-primary mx-2" onClick={handleCreateCategory}>
                            Cập nhật
                        </button>
                        <button className="btn btn-danger" onClick={handleCreateCategory1}>
                            Hủy
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};
export default memo(UpdateCategory);
