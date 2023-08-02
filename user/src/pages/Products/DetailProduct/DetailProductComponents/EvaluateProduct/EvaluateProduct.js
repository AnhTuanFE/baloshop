import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

import Rating from '~/components/HomeComponent/Rating/Rating';
import Message from '~/components/HomeComponent/LoadingError/Error';
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

    const [rating1, setRating1] = useState(0);
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
        <div className="mt-3 rounded-xl shadow-custom-shadow">
            <div className="m-5">
                <h2 className="mt-3 py-2 text-center text-xl font-bold">Đánh giá & nhận xét</h2>
                <div style={{ border: '2px solid #ccc', borderRadius: '10px' }}>
                    <div className="row">
                        <div className="col-md-4 col-sm-5 pt-4 text-center">
                            <div class="rating-box">
                                <h1 class="pt-4">{mediumReview}</h1>
                            </div>
                            <div className="reviewMedium">
                                <Rating value={mediumReview} />
                            </div>
                            <p>{reviewCart.length} đánh giá và nhận xét</p>
                        </div>
                        <div class="col-md-8 col-sm-7">
                            <div class="rating-bar0 justify-content-center">
                                <table class="mx-auto text-left">
                                    {returnStar.map((star, index) => {
                                        return (
                                            <tr key={index}>
                                                <td class="rating-label">
                                                    {star.rating}
                                                    <span class="fa fa-star star-active mx-1"></span>
                                                </td>
                                                <td class="rating-bar">
                                                    <div class="bar-container">
                                                        <div
                                                            class="bar-5"
                                                            style={{
                                                                width: `${star.percentage}%`,
                                                            }}
                                                        ></div>
                                                    </div>
                                                </td>
                                                <td class="text-right">{star.numReview} đánh giá</td>
                                            </tr>
                                        );
                                    })}
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="buttonReview" style={{ textAlign: 'center', marginTop: '10px' }}>
                    <button className="text-white" onClick={handleOpenModal}>
                        Đánh giá ngay
                    </button>
                </div>
            </div>
            {/* ============================================== bên dưới là modal ============================================= */}
            <dialog ref={modalRef} className="w-1/3 rounded-lg" onClose={handleCloseModal} onClick={handleOverlayClick}>
                <h3 className="mb-2 text-center text-lg font-bold">Đánh giá sản phẩm!</h3>
                <form method="dialog">
                    <button
                        onClick={handleCloseModal}
                        className="btn-sm btn-circle btn absolute right-2 top-2 bg-[var(--main-color2)] font-extrabold text-white"
                    >
                        ✕
                    </button>
                    <div class="modal-content">
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
                                            className="col-12 rounded-md border-0 bg-[var(--main-color)] p-3 font-semibold text-white"
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

            <div className="col-md-12 product-rating" style={{ paddingTop: '20px' }}>
                <div className="rating-review">
                    {reviews?.map((review) => (
                        <div
                            key={review._id}
                            className="mb-md-3 bg-light rounded-5 mb-2 p-3 shadow-sm"
                            style={{ borderRadius: '10px' }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <div className="rating-review__flex">
                                    <img
                                        src={`${review?.user?.image?.urlImageCloudinary}` || imageDefaul} // upload ảnh
                                        alt=""
                                        style={{
                                            height: '40px',
                                            width: '40px',
                                            borderRadius: '50%',
                                            marginRight: '5px',
                                            objectFit: 'cover',
                                        }}
                                        className="fix-none"
                                    />
                                    <div className="review-rating">
                                        <strong>{review.name}</strong>
                                    </div>
                                </div>
                                <div style={{ paddingLeft: '10px' }}>
                                    <span>
                                        {moment(review.createdAt).format('DD/MM/YYYY')}{' '}
                                        {moment(review.createdAt).hours()}
                                        {':'}
                                        {moment(review.createdAt).minutes() < 10
                                            ? `0${moment(review.createdAt).minutes()}`
                                            : moment(review.createdAt).minutes()}
                                    </span>
                                </div>
                            </div>
                            <div className="alert alert-info mt-3">
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <span
                                        style={{
                                            paddingRight: '5px',
                                            fontSize: '15px',
                                            fontWeight: '600',
                                        }}
                                    >
                                        Đánh giá:{' '}
                                    </span>
                                    <Rating value={review.rating} />
                                </div>
                                <div style={{ fontSize: '16px' }}>
                                    <span
                                        style={{
                                            paddingRight: '5px',
                                            fontSize: '15px',
                                            fontWeight: '600',
                                        }}
                                    >
                                        Màu sắc:
                                    </span>{' '}
                                    {review.color}
                                </div>
                                <div style={{ fontSize: '16px' }}>
                                    <span
                                        style={{
                                            paddingRight: '5px',
                                            fontSize: '15px',
                                            fontWeight: '600',
                                        }}
                                    >
                                        Nhận xét:
                                    </span>{' '}
                                    {review.comment}
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
