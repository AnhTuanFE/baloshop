import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Message from '~/components/HomeComponent/LoadingError/Error';
import Loading from '~/components/HomeComponent/LoadingError/Loading';
import { imageDefaul } from '~/utils/data';
//
import { PRODUCT_CREATE_COMMENTCHILD_RESET, PRODUCT_CREATE_COMMENT_RESET } from '~/redux/Constants/ProductConstants';
import { createProductComment, createProductCommentChild, getAllComments } from '~/redux/Actions/ProductActions';
import { listUser } from '~/redux/Actions/userActions';

import './AskAndAnswer.css';

function AskAndAnswer({ productId }) {
    const dispatch = useDispatch();

    const [question, setQuestion] = useState('');
    const [imageProduct, setImageProduct] = useState('');
    const [nameProduct, setNameProduct] = useState('');
    const [idComment, setIdComment] = useState('');
    const [buleanReview, setBuleanReview] = useState('');
    const [questionChild, setQuestionChild] = useState('');

    //
    const productDetail = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetail;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const productCommentCreate = useSelector((state) => state.productCommentCreate); //comment
    const {
        loading: loadingCreateComment,
        error: errorCreateComment,
        success: successCreateComment,
    } = productCommentCreate;

    const productCommentChildCreate = useSelector((state) => state.productCommentChildCreate); //comment child
    const {
        loading: loadingCreateCommentChild,
        error: errorCreateCommentChild,
        success: successCreateCommentChild,
    } = productCommentChildCreate;

    const listAllComments = useSelector((state) => state.getAllCommentsProduct);
    const { comments } = listAllComments;

    const userList = useSelector((state) => state.userAll);
    const { users } = userList;

    //comment
    const submitComment = (e) => {
        e.preventDefault();
        dispatch(createProductComment(productId, { nameProduct, imageProduct, question }));
        setQuestion('');
    };

    // quenstion child
    const submitQuestionChild = (e) => {
        e.preventDefault();
        dispatch(createProductCommentChild(productId, { questionChild, idComment }));
        setQuestionChild('');
    };

    //useEffect
    useEffect(() => {
        if (successCreateComment) {
            dispatch({ type: PRODUCT_CREATE_COMMENT_RESET });
        }
        if (successCreateCommentChild) {
            dispatch({ type: PRODUCT_CREATE_COMMENTCHILD_RESET });
        }
    }, [successCreateComment, successCreateCommentChild]);

    useEffect(() => {
        dispatch(getAllComments(productId));
    }, [productId, successCreateComment, successCreateCommentChild]);

    useEffect(() => {
        dispatch(listUser());
    }, [dispatch]);

    function findProductUser(data) {
        const findUser = users?.find((user) => user._id === data.user);

        return (
            <img
                src={`${findUser?.image.urlImageCloudinary}` || imageDefaul} // upload ảnh
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
    return (
        <>
            <div
                style={{
                    borderRadius: '10px',
                    boxShadow: '0 1px 2px 0 rgb(60 64 67 / 10%), 0 2px 6px 2px rgb(60 64 67 / 15%)',
                    paddingTop: '10px',
                    marginTop: '15px',
                }}
            >
                <h2 className="noti-view">Hỏi và đáp</h2>
                <form onSubmit={submitComment} className="flex justify-between">
                    <textarea
                        value={question}
                        className="question-product"
                        placeholder="Xin mời để lại câu hỏi, BaloStore sẽ trả lời lại trong 1h, các câu hỏi sau 22h - 8h sẽ được trả lời vào sáng hôm sau"
                        onChange={(e) => {
                            setQuestion(e.target.value);
                            setImageProduct(product?.image[0].image);
                            setNameProduct(product.name);
                        }}
                    ></textarea>
                    {userInfo ? (
                        <button className="button">
                            <i class="fas fa-paper-plane" style={{ paddingRight: '5px' }}></i>
                            Gửi
                        </button>
                    ) : (
                        <div className="mb-3  mt-5">
                            {/* <Message variant={'alert-warning'}> */}
                            <Link to="/login">
                                <strong
                                    data-bs-dismiss="modal"
                                    className="mr-5 w-full rounded bg-[var(--main-color)] px-4 py-3 text-sm text-white"
                                >
                                    Đăng nhập
                                </strong>
                            </Link>
                            {/* </Message> */}
                        </div>
                    )}
                </form>
                <div className="col-md-12 product-rating">
                    <div className="rating-review">
                        {loadingCreateComment && <Loading />}
                        {errorCreateCommentChild && <Message variant="alert-danger">{errorCreateCommentChild}</Message>}
                        {comments?.map((review) => (
                            <div key={review._id} className="mb-md-2 rounded-5 backgroud mb-2 p-3">
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <div className="rating-review__flex">
                                        <img
                                            src={`${review?.user?.image?.urlImageCloudinary}` || imageDefaul}
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
                                <div
                                    className="alert product-review mt-3"
                                    style={{ display: 'flex', flexDirection: 'column' }}
                                >
                                    <span>{review.question}</span>
                                    <span
                                        className="commentChild"
                                        onClick={() => {
                                            setIdComment(review._id);
                                            setBuleanReview(review._id);
                                        }}
                                    >
                                        <i class="fas fa-comments-alt" style={{ paddingRight: '5px' }}></i>
                                        Trả lời
                                    </span>
                                </div>
                                <div className="product-review" style={{ padding: '0px', boxShadow: 'none' }}>
                                    {review.commentChilds?.map((child) => (
                                        <div
                                            key={child._id}
                                            className="mb-md-2 rounded-5 backgroud marginbottom mb-2 p-3"
                                        >
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
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {buleanReview === review._id && (
                                    <form
                                        onSubmit={submitQuestionChild}
                                        style={{ display: 'flex', justifyContent: 'space-between' }}
                                    >
                                        <textarea
                                            className="question-product"
                                            placeholder="Xin mời để lại câu hỏi, BaloStore sẽ trả lời lại trong 1h, các câu hỏi sau 22h - 8h sẽ được trả lời vào sáng hôm sau"
                                            value={questionChild}
                                            onChange={(e) => {
                                                setQuestionChild(e.target.value);
                                            }}
                                        ></textarea>
                                        {userInfo ? (
                                            <button className="button">
                                                <i class="fas fa-paper-plane" style={{ paddingRight: '5px' }}></i>
                                                Gửi
                                            </button>
                                        ) : (
                                            <div className="flex-padding my-3">
                                                <Message variant={'alert-warning'}>
                                                    <Link to="/login">
                                                        <strong
                                                            data-bs-dismiss="modal"
                                                            style={{
                                                                fontSize: '13px',
                                                                padding: '0px 2px',
                                                            }}
                                                        >
                                                            Đăng nhập
                                                        </strong>
                                                    </Link>
                                                </Message>
                                            </div>
                                        )}
                                    </form>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default AskAndAnswer;
