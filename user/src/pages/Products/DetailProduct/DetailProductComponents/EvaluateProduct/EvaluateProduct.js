import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

import Rating from '~/components/HomeComponent/Rating/Rating';
import Message from '~/components/HomeComponent/LoadingError/Error';
import { imageDefaul } from '~/utils/data';
import { createProductReview, getAllReviews } from '~/redux/Actions/ProductActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '~/redux/Constants/ProductConstants';

import './EvaluateProduct.css';

function EvaluateProduct({ productId }) {
    const dispatch = useDispatch();

    const [mediumReview, setMediumReview] = useState();
    const [bulean, setBulean] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [reviewColor, setReviewColor] = useState('');

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
        <div
            style={{
                borderRadius: '10px',
                boxShadow: '0 1px 2px 0 rgb(60 64 67 / 10%), 0 2px 6px 2px rgb(60 64 67 / 15%)',
                paddingTop: '10px',
            }}
        >
            <div className="col-md-12 col-sm-12">
                <h2 className="noti-view">Đánh giá & nhận xét</h2>
                <div style={{ border: '2px solid #ccc', borderRadius: '10px' }}>
                    <div className="row">
                        <div className="col-md-4 col-sm-5 text-center pt-4">
                            <div class="rating-box">
                                <h1 class="pt-4">{mediumReview}</h1>
                                <p class="">out of 5</p>
                            </div>
                            <div className="reviewMedium">
                                <Rating value={mediumReview} />
                            </div>
                            <p class="">{reviewCart.length} đánh giá và nhận xét</p>
                        </div>
                        <div class="col-md-8 col-sm-7">
                            <div class="rating-bar0 justify-content-center">
                                <table class="text-left mx-auto">
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
                    <p>Bạn đánh giá sao sản phẩm này</p>
                    <Link className="text-white">
                        <button>Đánh giá ngay</button>
                    </Link>
                </div>
            </div>
            <div className="col-md-12 product-rating">
                <div
                    class="modal fade"
                    id="staticBackdrop"
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                    tabindex="-1"
                    aria-labelledby="staticBackdropLabel"
                    aria-hidden="true"
                >
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header" style={{ padding: '0.5rem 1rem' }}>
                                <button
                                    type="button"
                                    class="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={() => {
                                        setBulean(true);
                                    }}
                                ></button>
                            </div>
                            <div class="modal-body">
                                <div>
                                    <h6 className="write-review text-center" style={{ fontSize: '20px' }}>
                                        Đánh giá sản phẩm
                                    </h6>
                                    <div className="my-4">
                                        {errorCreateReview && (
                                            <Message variant="alert-danger">{errorCreateReview}</Message>
                                        )}
                                        {successCreateReview && (
                                            <Message class="alert alert-primary">Cảm ơn bạn đã đánh giá</Message>
                                        )}
                                    </div>
                                    {userInfo ? (
                                        <form onSubmit={submitHandler}>
                                            <div className="my-4">
                                                <strong>Đánh giá</strong>
                                                <select
                                                    value={rating}
                                                    onChange={(e) => setRating(e.target.value)}
                                                    className="col-12 p-3 mt-2 border-0 rounded"
                                                    style={{ backgroundColor: '#e9eaed80' }}
                                                >
                                                    <option value="">Lựa chọn...</option>
                                                    <option value="1">1 - Rất tệ</option>
                                                    <option value="2">2 - Tệ</option>
                                                    <option value="3">3 - Bình thường</option>
                                                    <option value="4">4 - Tốt</option>
                                                    <option value="5">5 - Rất tốt</option>
                                                </select>
                                            </div>
                                            <div className="my-4">
                                                <strong>Màu sắc</strong>
                                                <select
                                                    value={reviewColor}
                                                    onChange={(e) => setReviewColor(e.target.value)}
                                                    className="col-12 p-3 mt-2 border-0 rounded"
                                                    style={{ backgroundColor: '#e9eaed80' }}
                                                >
                                                    <option value="">Lựa chọn...</option>
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
                                                    className="col-12 p-3 mt-2 border-0 rounded"
                                                    style={{ backgroundColor: '#e9eaed80' }}
                                                ></textarea>
                                            </div>
                                            <div className="my-3">
                                                <button
                                                    disabled={loadingCreateReview}
                                                    className="col-12 bg-orange border-0 p-3 rounded text-white"
                                                    type="submit"
                                                >
                                                    <p>Gửi đánh giá</p>
                                                </button>
                                            </div>
                                        </form>
                                    ) : (
                                        <div className="my-3">
                                            <Message variant={'alert-warning'}>
                                                Làm ơn{' '}
                                                <Link to="/login">
                                                    " <strong data-bs-dismiss="modal">Đăng nhập</strong> "
                                                </Link>{' '}
                                                và mua sản phẩm để đánh giá{' '}
                                            </Message>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-12 product-rating" style={{ paddingTop: '20px' }}>
                <div className="rating-review">
                    {reviews?.map((review) => (
                        <div
                            key={review._id}
                            className="mb-2 mb-md-3 bg-light p-3 shadow-sm rounded-5"
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
                                        {/* {moment(review.createdAt).calendar()} */}
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
