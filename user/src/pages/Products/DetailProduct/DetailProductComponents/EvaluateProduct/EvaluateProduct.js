import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

import Rating from '~/components/Rating/Rating';
import Message from '~/components/LoadingError/Error';
import { imageDefaul } from '~/utils/data';
import { createProductReview, getAllReviews } from '~/redux/Actions/ProductActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '~/redux/Constants/ProductConstants';
// ==== rating
import Box from '@mui/material/Box';
import { Rating as RatingMUI } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import './EvaluateProduct.css';

const labels = {
    1: 'Không hài lòng',
    2: 'Tạm được',
    3: 'Hài lòng',
    4: 'Tốt',
    5: 'Rất tốt',
};

function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}
function EvaluateProduct({ productId }) {
    const dispatch = useDispatch();
    // modal
    const modalRef = useRef(null);

    const handleOpenModal = () => {
        modalRef.current.showModal();
    };

    const handleCloseModal = () => {
        modalRef.current.close();
    };

    const handleOverlayClick = (event) => {
        if (event.target === modalRef.current) {
            handleCloseModal();
        }
    };
    // modal

    const [mediumReview, setMediumReview] = useState();
    const [bulean, setBulean] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [reviewColor, setReviewColor] = useState('');

    const [hover, setHover] = useState(-1);

    const listAllReviews = useSelector((state) => state.getAllReviewsProduct);
    const { reviews } = listAllReviews;
    const reviewCart = reviews;

    //bên detail product cũng có
    const productReviewCreate = useSelector((state) => state.productReviewCreate);

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const productDetail = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetail;

    const optionColor = product?.optionColor?.sort(({ color: b }, { color: a }) => (a > b ? 1 : a < b ? -1 : 0));

    const {
        loading: loadingCreateReview,
        error: errorCreateReview,
        success: successCreateReview,
    } = productReviewCreate;

    const arrStar = [5, 4, 3, 2, 1];

    const returnStar = arrStar.map((star) => {
        let review = reviewCart?.filter((rev) => {
            return star === rev.rating;
        });
        star = {
            rating: star,
            numReview: review.length,
            percentage: (review.length / (reviewCart.length === 0 ? 1 : reviewCart.length)) * 100,
        };
        return star;
    });

    // useEffect(() => {
    //     if (optionColor) {
    //         setColor(optionColor[0]?.color);
    //     }
    // }, [optionColor]);

    // useEffect(() => {
    //     setOptionArrColor(() => {
    //         if (optionColor !== undefined && optionIndex !== undefined) {
    //             let x = optionColor[optionIndex];
    //             return x;
    //         }
    //     });
    // }, [optionIndex, optionColor]);

    useEffect(() => {
        const medium = returnStar.reduce((total, num) => {
            return total + num.rating * num.numReview;
        }, 0);
        const sumReview = returnStar.reduce((total, num) => {
            return total + num.numReview;
        }, 0);
        let retult = ((medium / (5 * (sumReview === 0 ? 1 : sumReview))) * 5).toFixed(1);
        setMediumReview(retult);
    }, [reviewCart]);

    useEffect(() => {
        dispatch(getAllReviews(productId));
    }, [productId, successCreateReview]);

    useEffect(() => {
        if (bulean) {
            setBulean(false);
            setRating(0);
            setComment('');
            setReviewColor('');
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
        }
    }, [bulean]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createProductReview(productId, rating, reviewColor, comment));
    };
    return (
        <div className="rounded-xl bg-white shadow-custom-shadow">
            <div className=" mt-5 max-md:mx-2 md:mx-5">
                <h2 className="mt-3 py-2 text-center text-xl font-bold">Đánh giá & nhận xét</h2>
                <div className="rounded-xl" style={{ border: '2px solid #ccc' }}>
                    <div className="row">
                        <div className="col-md-4 col-sm-5 pt-4 text-center">
                            <div className="flex">
                                <div className="mx-auto rounded-xl bg-[#fbc02d] px-6 py-8 text-white">
                                    <h1 className="text-2xl">{mediumReview} / 5</h1>
                                </div>
                            </div>
                            <div className="mx-1 mt-1 text-sm">
                                <Rating value={mediumReview} />
                            </div>
                            <p className="text-xl">{reviewCart.length} đánh giá và nhận xét</p>
                        </div>
                        <div className="col-md-8 col-sm-7">
                            <div className=" px-4 py-1 max-md:mt-2">
                                <table className="text-left">
                                    {returnStar.map((star, index) => {
                                        return (
                                            <tr key={index}>
                                                <td className="text-center font-bold">
                                                    <p className="min-w-[52px] pr-2">
                                                        {star.rating}
                                                        <span className="fa fa-star mx-1 my-[10px] text-[#fbc02d] hover:cursor-pointer hover:text-[#f9a825]"></span>
                                                    </p>
                                                </td>
                                                <td className="w-full rounded">
                                                    <div className="mb-1 w-full rounded-2xl bg-[#f1f1f1] text-center text-white">
                                                        <div
                                                            className=" h-3 rounded-2xl bg-[#fbc02d] "
                                                            style={{
                                                                width: `${star.percentage}%`,
                                                            }}
                                                        ></div>
                                                    </div>
                                                </td>
                                                <td className="text-center">
                                                    <p className="min-w-[100px] pl-2">{star.numReview} đánh giá</p>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-3 text-center">
                    <button
                        className=" w-[300px] cursor-pointer rounded-lg bg-[var(--main-color)] py-2 text-white hover:bg-[var(--main-color-hover)]"
                        onClick={handleOpenModal}
                    >
                        Đánh giá ngay
                    </button>
                </div>
            </div>
            {/* ============================================== bên dưới là modal ============================================= */}
            <dialog
                ref={modalRef}
                className="w-[400px] rounded-lg"
                onClose={handleCloseModal}
                onClick={handleOverlayClick}
            >
                <h3 className="mb-2 text-center text-lg font-bold">Đánh giá sản phẩm!</h3>
                <form method="dialog">
                    <button
                        onClick={handleCloseModal}
                        className="btn-sm btn-circle btn absolute right-2 top-2 bg-[var(--blue-color)] font-extrabold text-white"
                    >
                        ✕
                    </button>
                    <div className="shadow-[0 1px 2px 0 rgb(60 64 67 / 10%), 0 2px 6px 2px rgb(60 64 67 / 15%)] rounded-2xl">
                        <div class="modal-body">
                            <div className="my-4">
                                {errorCreateReview && <Message variant="alert-danger">{errorCreateReview}</Message>}
                                {successCreateReview && (
                                    <Message class="alert-primary alert">Cảm ơn bạn đã đánh giá</Message>
                                )}
                            </div>
                            {userInfo ? (
                                <form onSubmit={submitHandler}>
                                    <div className="my-4">
                                        <strong>Đánh giá</strong>
                                        <Box className=" flex justify-center">
                                            <div>
                                                <RatingMUI
                                                    name="hover1-feedback"
                                                    value={rating}
                                                    size="large"
                                                    getLabelText={getLabelText}
                                                    onChange={(event, newValue) => {
                                                        setRating(newValue);
                                                    }}
                                                    onChangeActive={(event, newHover) => {
                                                        setHover(newHover);
                                                    }}
                                                    emptyIcon={
                                                        <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                                                    }
                                                />
                                                <div className="min-h-[40px]">
                                                    {rating !== null && (
                                                        <Box className="text-center">
                                                            {labels[hover !== -1 ? hover : rating]}
                                                        </Box>
                                                    )}
                                                </div>
                                            </div>
                                        </Box>
                                    </div>
                                    <div className="my-4">
                                        <strong>Màu sắc</strong>
                                        <select
                                            value={reviewColor}
                                            onChange={(e) => setReviewColor(e.target.value)}
                                            className="col-12 mt-2 rounded border-0 bg-[var(--content-color)] p-3"
                                        >
                                            <option value="">Chọn màu...</option>
                                            {optionColor?.map((option) => {
                                                return (
                                                    <option key={option._id} value={option.color}>
                                                        {option.color}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                    <div className="my-4">
                                        <strong>Bình luận</strong>
                                        <textarea
                                            row="3"
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            className="col-12 mt-2 rounded border-0 bg-[var(--content-color)] p-3"
                                        ></textarea>
                                    </div>
                                    <div className="">
                                        <button
                                            disabled={loadingCreateReview}
                                            className="col-12 rounded-md border-0 bg-[var(--main-color)] px-3 py-2 font-semibold text-white"
                                            type="submit"
                                        >
                                            Gửi đánh giá
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <div className="my-3 w-full">
                                    <Message variant={'alert-warning'}>
                                        Vui lòng{' '}
                                        <Link to="/login">
                                            <strong data-bs-dismiss="modal">Đăng nhập</strong>
                                        </Link>{' '}
                                        và mua sản phẩm để đánh giá{' '}
                                    </Message>
                                </div>
                            )}
                        </div>
                    </div>
                    {/* <div className="modal-action">
                        <button className="btn bg-red-500 px-3 py-1" onClick={handleCloseModal}>
                            Đóng
                        </button>
                    </div> */}
                </form>
            </dialog>
            <div className=" mt-3 w-full py-1">
                <div className="rating-review">
                    <hr className="my-4"></hr>
                    {reviews?.map((review) => (
                        <div key={review._id} className="rounded-5 rounded-xl bg-white px-3 py-3 shadow-custom-shadow">
                            <div className="flex items-center">
                                <div className="flex items-center">
                                    <img
                                        src={`${review?.user?.image}` || imageDefaul} // upload ảnh
                                        alt=""
                                        className="fix-none mr-1 h-10 w-10 rounded-[50%] object-cover"
                                    />
                                    <div className="review-rating">
                                        <strong>{review.name}</strong>
                                    </div>
                                </div>
                                <div className="pl-3">
                                    <span>
                                        {'('}
                                        {moment(review.createdAt).format('DD/MM/YYYY')}{' '}
                                        {moment(review.createdAt).hours()}
                                        {':'}
                                        {moment(review.createdAt).minutes() < 10
                                            ? `0${moment(review.createdAt).minutes()}`
                                            : moment(review.createdAt).minutes()}
                                        {')'}
                                    </span>
                                </div>
                            </div>
                            <div className=" mt-3 rounded-lg bg-[var(--blue-color)] px-3 py-2">
                                <div className="flex items-center">
                                    <span className="pr-1 text-base font-semibold">Đánh giá: </span>
                                    <Rating value={review.rating} />
                                </div>
                                <div className="flex">
                                    <span className="pr-1 text-base font-semibold">Màu sắc:</span>
                                    <div className="ml-1 text-base font-medium">{review.color}</div>
                                </div>
                                <div className="flex text-base">
                                    <span className="min-w-[80px] pr-1 text-base font-semibold">Nhận xét:</span>
                                    <div className="border-1 min-h-16 ml-1 w-[400px] rounded-xl border-solid border-[#343a40] bg-white px-2 pt-2 ">
                                        <span className="">{review.comment}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default EvaluateProduct;
