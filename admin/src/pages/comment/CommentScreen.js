import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import {
    ListProductCommentAll,
    createProductCommentChild,
    deleteCommentsProduct,
    deleteCommentsChildProduct,
} from '~/Redux/Actions/ProductActions';
import { PRODUCT_DELETE_COMMENTCHILD_RESET, PRODUCT_DELETE_COMMENT_RESET } from '~/Redux/Constants/ProductConstants';
import { listUser } from '~/Redux/Actions/userActions';

import Message from '~/components/LoadingError/Error';
import Loading from '~/components/LoadingError/Loading';
import { imageDefaul, logoDefaul } from '~/data/data';

import './CommentScreen.css';

const CommentScreen = () => {
    const dispatch = useDispatch();
    const commentList = useSelector((state) => state.productCommentGet);
    const { products, loading, error } = commentList;

    const productCommentChildCreate = useSelector((state) => state.productCommentChildCreate);
    const { success: successCommentChild } = productCommentChildCreate;
    const productDeleteComments = useSelector((state) => state.productDeleteComments);
    const { success: successDeleteComment, error: errorComment } = productDeleteComments;
    const productDeleteCommentsChild = useSelector((state) => state.productDeleteCommentsChild);
    const { success: successDeleteCommentChild, error: errorCommentChild } = productDeleteCommentsChild;
    const [buleanReview, setBuleanReview] = useState('');
    const [productId, setProductId] = useState('');
    const [idComment, setIdComment] = useState('');
    const [questionChild, setQuestionChild] = useState('');

    useEffect(() => {
        if (successCommentChild) {
            dispatch({ type: PRODUCT_DELETE_COMMENT_RESET });
        }
        if (successDeleteCommentChild) {
            dispatch({ type: PRODUCT_DELETE_COMMENTCHILD_RESET });
        }
        dispatch(ListProductCommentAll());
    }, [dispatch, successCommentChild, successDeleteComment, successDeleteCommentChild]);

    // ========================= sắp bỏ
    const userList = useSelector((state) => state.userList);
    const { users } = userList;
    useEffect(() => {
        dispatch(listUser());
    }, [dispatch]);

    function findProductUser(data) {
        const findUser = users?.find((user) => user._id === data.user);
        return (
            <img
                src={imageDefaul}
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
        );
    }
    const submitQuestionChild = (e) => {
        e.preventDefault();
        dispatch(createProductCommentChild(productId, { questionChild, idComment }));
        setQuestionChild('');
    };
    const handlerCommentDelete = (idProduct, idComment) => {
        if (window.confirm('Bạn có chắc chắn thu hồi tin nhắn này không')) {
            dispatch(deleteCommentsProduct(idProduct, idComment));
        }
    };
    const handlerCommentChildDelete = (idProduct, idComment, idCommentChild) => {
        if (window.confirm('Bạn có chắc chắn thu hồi tin nhắn này không')) {
            dispatch(deleteCommentsChildProduct(idProduct, idComment, idCommentChild));
        }
    };
    return (
        <>
            <div className="content-main ">
                <div className="content-header">
                    <h2 className="content-title" style={{ padding: '15px' }}>
                        Bình luận
                    </h2>
                </div>
                {loading && <Loading />}
                {error && <Message variant="alert-danger">{error}</Message>}
                {errorCommentChild && <Message variant="alert-danger">{errorCommentChild}</Message>}
                <div
                    class="accordion overflow-auto px-1"
                    style={{ height: '74vh', boxShadow: '0px 0px 4px 2px rgba(0,0,0,0.24) inset' }}
                    id="accordionPanelsStayOpenExample"
                >
                    {products?.map((product, index) => {
                        return (
                            <div
                                style={{
                                    marginTop: '12px',
                                }}
                                class="accordion-item "
                                key={product._id}
                            >
                                <h2 class="accordion-header" id={`panelsStayOpen-heading${index}`}>
                                    <button
                                        class="accordion-button"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target={`#panelsStayOpen-collapse${index}`}
                                        aria-expanded="true"
                                        aria-controls={`panelsStayOpen-collapse${index}`}
                                    >
                                        <table class="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col" style={{ width: '10%' }}>
                                                        #
                                                    </th>
                                                    <th scope="col" style={{ width: '90%' }}>
                                                        Bình luận của sản phẩm {product?.nameProduct}
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <img
                                                            src={`${
                                                                product?.imageProduct
                                                                    ? product?.imageProduct
                                                                    : imageDefaul
                                                            } `}
                                                            alt=""
                                                            style={{ height: '40px', width: '40px' }}
                                                        />
                                                    </td>
                                                    <td>{product?.nameProduct}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </button>
                                </h2>
                                <div
                                    id={`panelsStayOpen-collapse${index}`}
                                    class="accordion-collapse show collapse"
                                    aria-labelledby={`panelsStayOpen-heading${index}`}
                                >
                                    <div class="accordion-body">
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                            }}
                                        >
                                            <div className="rating-review__flex">
                                                <img
                                                    src={`${product?.user?.image ? product?.user?.image : imageDefaul}`}
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
                                                <div className="product-rating">
                                                    <strong>{product?.name}</strong>
                                                </div>
                                            </div>
                                            <div style={{ paddingLeft: '10px' }}>
                                                <span>
                                                    {/* {moment(product.createdAt).calendar()} */}
                                                    {moment(product.createdAt).format('DD/MM/YYYY')}{' '}
                                                    {moment(product.createdAt).hours()}
                                                    {':'}
                                                    {moment(product.createdAt).minutes() < 10
                                                        ? `0${moment(product.createdAt).minutes()}`
                                                        : moment(product.createdAt).minutes()}
                                                </span>
                                            </div>
                                        </div>
                                        <div
                                            className="alert product-review mt-3"
                                            style={{ display: 'flex', flexDirection: 'column' }}
                                        >
                                            <span>{product.question}</span>
                                            <div className="d-flex justify-content-end">
                                                {/* <span
                                                    className="commentChild text-dark pe-2"
                                                    onClick={() => {
                                                        handlerCommentDelete(product?.idProduct, product?._id);
                                                    }}
                                                >
                                                    <i class="fas fa-comment-times" style={{ paddingRight: '5px' }}></i>
                                                    Thu hồi
                                                </span> */}
                                                <span
                                                    className="commentChild ps-2"
                                                    onClick={() => {
                                                        setIdComment(product._id);
                                                        setProductId(product.idProduct);
                                                        setBuleanReview(product._id);
                                                    }}
                                                >
                                                    <i class="fas fa-comments-alt" style={{ paddingRight: '5px' }}></i>
                                                    Trả lời
                                                </span>
                                            </div>
                                        </div>
                                        <div className="product-review" style={{ padding: '0px', boxShadow: 'none' }}>
                                            {product.commentChilds?.map((child) => (
                                                <div key={child._id} className="mb-md-3 marginbottom mb-5 rounded p-1">
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'space-between',
                                                        }}
                                                    >
                                                        <div className="rating-review__flex">
                                                            {findProductUser(child)}
                                                            <div className="review-rating">
                                                                <strong>{child.name}</strong>
                                                            </div>
                                                        </div>
                                                        <div style={{ paddingLeft: '10px' }}>
                                                            <span>
                                                                {/* {moment(review.createdAt).calendar()} */}
                                                                {moment(child.createdAt).format('DD/MM/YYYY')}{' '}
                                                                {moment(child.createdAt).hours()}
                                                                {':'}
                                                                {moment(child.createdAt).minutes() < 10
                                                                    ? `0${moment(child.createdAt).minutes()}`
                                                                    : moment(child.createdAt).minutes()}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="alert product-review mt-3">
                                                        <span>{child.questionChild}</span>
                                                        <div className="d-flex justify-content-end">
                                                            <span
                                                                className="commentChild text-dark pe-2"
                                                                onClick={() => {
                                                                    handlerCommentChildDelete(
                                                                        product?.idProduct,
                                                                        product?._id,
                                                                        child._id,
                                                                    );
                                                                }}
                                                            >
                                                                <i
                                                                    class="fas fa-comment-times"
                                                                    style={{ paddingRight: '5px' }}
                                                                ></i>
                                                                Thu hồi
                                                            </span>
                                                            <span
                                                                className="commentChild ps-2"
                                                                onClick={() => {
                                                                    setIdComment(product._id);
                                                                    setProductId(product.idProduct);
                                                                    setBuleanReview(product._id);
                                                                }}
                                                            >
                                                                <i
                                                                    class="fas fa-comments-alt"
                                                                    style={{ paddingRight: '5px' }}
                                                                ></i>
                                                                Trả lời
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        {buleanReview === product._id && (
                                            <form
                                                onSubmit={submitQuestionChild}
                                                style={{ display: 'flex', justifyContent: 'space-between' }}
                                            >
                                                <textarea
                                                    className="question-product"
                                                    placeholder="Trả lời bình luận"
                                                    value={questionChild}
                                                    onChange={(e) => {
                                                        setQuestionChild(e.target.value);
                                                    }}
                                                ></textarea>
                                                <button className="button">
                                                    <i class="fas fa-paper-plane" style={{ paddingRight: '5px' }}></i>
                                                    Gửi
                                                </button>
                                            </form>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default CommentScreen;
