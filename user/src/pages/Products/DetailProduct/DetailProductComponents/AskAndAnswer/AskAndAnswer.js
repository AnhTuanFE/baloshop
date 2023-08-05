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
                className="mr-2 h-10 w-10 rounded-[50%] object-cover"
            />
        );
    }
    return (
        <>
            <div className="mt-4 rounded-xl pt-2">
                <div
                    className="mb-4 rounded-xl px-5 py-4"
                    style={{
                        boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)',
                    }}
                >
                    <h2 className="pb-1 text-2xl font-semibold">Hỏi và đáp</h2>
                    <form onSubmit={submitComment} className="ml-5 flex">
                        <textarea
                            value={question}
                            className="h-20 w-3/5 rounded-xl px-2 py-1 text-base shadow-sm"
                            placeholder="Xin mời để lại câu hỏi, BaloStore sẽ trả lời lại trong 1h, các câu hỏi sau 22h - 8h sẽ được trả lời vào sáng hôm sau"
                            onChange={(e) => {
                                setQuestion(e.target.value);
                                setImageProduct(product?.image[0].image);
                                setNameProduct(product.name);
                            }}
                        ></textarea>
                        {userInfo ? (
                            <div className="ml-2 mt-3">
                                <button className="rounded-lg bg-[var(--main-color)] px-6 py-2 text-white hover:opacity-80">
                                    <i className="fas fa-paper-plane pr-1"></i>
                                    Gửi
                                </button>
                            </div>
                        ) : (
                            <div className="mt-2">
                                <Link to="/login">
                                    <button className="mx-3 rounded-lg bg-[var(--main-color)] px-2 py-3 text-sm font-semibold text-white">
                                        Đăng nhập
                                    </button>
                                </Link>
                            </div>
                        )}
                    </form>
                </div>
                {/* comment */}
                <div
                    className="col-md-12 mt-2 rounded-2xl bg-white"
                    style={{
                        boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)',
                    }}
                >
                    <div className="rating-review">
                        {loadingCreateComment && <Loading />}
                        {errorCreateCommentChild && <Message variant="alert-danger">{errorCreateCommentChild}</Message>}
                        {comments?.map((review) => (
                            <div key={review._id} className="mb-md-2 rounded-5 mb-2 bg-[#ebeced85] p-3">
                                <div className="">
                                    <div className="flex items-center justify-start">
                                        <div className="flex items-end">
                                            <img
                                                src={`${review?.user?.image?.urlImageCloudinary}` || imageDefaul}
                                                alt=""
                                                className="mr-4 h-10 w-10 rounded-[50%] object-cover"
                                            />
                                            <div className="">
                                                <strong>{review.name}</strong>
                                            </div>
                                        </div>
                                        <div className="pl-3 pt-3">
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
                                    <div className="mt-3 flex">
                                        <div className=" min-h-16 rounded-xl border-2 border-solid border-[#343a40] bg-white p-3">
                                            <span>{review.question}</span>
                                        </div>
                                        <div className=" my-auto ml-1 min-w-[100px]">
                                            <span
                                                className="cursor-pointer text-center text-base text-red-700"
                                                onClick={() => {
                                                    setIdComment(review._id);
                                                    setBuleanReview(review._id);
                                                }}
                                            >
                                                <i className="fas fa-comments-alt pr-1"></i>
                                                Trả lời
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* comment child */}
                                <div className="ml-8 ">
                                    {review.commentChilds?.map((child) => (
                                        <div key={child._id} className="mb-md-2 rounded-5 mb-2 bg-[#ebeced85] p-3">
                                            <div className="flex items-center">
                                                <div className="flex items-end">
                                                    {findProductUser(child)}
                                                    <div className="">
                                                        <strong>{child.name}</strong>
                                                    </div>
                                                </div>
                                                <div className="ml-2 pl-2 pt-3">
                                                    <span>
                                                        {'('}
                                                        {moment(child.createdAt).format('DD/MM/YYYY')}{' '}
                                                        {moment(child.createdAt).hours()}
                                                        {':'}
                                                        {moment(child.createdAt).minutes() < 10
                                                            ? `0${moment(child.createdAt).minutes()}`
                                                            : moment(child.createdAt).minutes()}
                                                        {')'}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="mt-3 w-2/5 rounded-xl border-2 border-solid border-[#343a40] bg-white p-2">
                                                <span>{child.questionChild}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {buleanReview === review._id && (
                                    <form onSubmit={submitQuestionChild} className="flex">
                                        <textarea
                                            // className="question-product"
                                            className="h-20 w-3/5 rounded-xl px-2 py-1 text-base shadow-sm"
                                            placeholder="Bình luận"
                                            value={questionChild}
                                            onChange={(e) => {
                                                setQuestionChild(e.target.value);
                                            }}
                                        ></textarea>
                                        {userInfo ? (
                                            <button className="button my-auto ml-1">
                                                <i className="fas fa-paper-plane pr-1"></i>
                                                Gửi
                                            </button>
                                        ) : (
                                            <div className="flex-padding my-3">
                                                <Link to="/login">
                                                    <strong className="ml-1 rounded-xl bg-[var(--main-color)] px-4 py-2 text-sm font-semibold text-white">
                                                        Đăng nhập
                                                    </strong>
                                                </Link>
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
