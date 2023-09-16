import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Message from '~/components/LoadingError/Error';
import Loading from '~/components/LoadingError/Loading';
import { imageDefaul } from '~/utils/data';
import { PRODUCT_CREATE_COMMENTCHILD_RESET, PRODUCT_CREATE_COMMENT_RESET } from '~/redux/Constants/ProductConstants';
import { createProductComment, createProductCommentChild } from '~/redux/Actions/ProductActions';
import { Radio, notification, ConfigProvider } from 'antd';

import './AskAndAnswer.css';

function AskAndAnswer(props) {
    const { product, userInfo } = props;
    const dispatch = useDispatch();
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (placement, notify, type) => {
        api[type]({
            message: `Thông báo `,
            description: `${notify}`,
            placement,
        });
    };
    const [question, setQuestion] = useState('');

    const [idComment, setIdComment] = useState('');
    const [buleanReview, setBuleanReview] = useState('');
    const [questionChild, setQuestionChild] = useState('');

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

    //comment
    const submitComment = (e) => {
        e.preventDefault();
        dispatch(
            createProductComment({
                productId: product._id,
                nameProduct: product.name,
                imageProduct: product.image[0],
                question: question,
            }),
        );
        setQuestion('');
    };

    // quenstion child
    const submitQuestionChild = (e) => {
        e.preventDefault();
        dispatch(createProductCommentChild({ productId: product._id, questionChild: question, idComment: idComment }));
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
        dispatch({ type: PRODUCT_CREATE_COMMENT_RESET });
        dispatch({ type: PRODUCT_CREATE_COMMENTCHILD_RESET });
    }, []);
    return (
        <>
            {contextHolder}
            {Object.keys(product).length > 1 ? (
                <div className="mt-4 rounded-xl bg-white pt-2">
                    <div className="rounded-xl py-4 shadow-custom-shadow max-md:px-1 md:px-5">
                        {/* {loadingCreateComment && <Loading />} */}
                        {errorCreateComment && <Message variant="alert-danger">{errorCreateComment}</Message>}
                        <h2 className="ml-5 pb-1 text-2xl font-semibold">Hỏi và đáp</h2>
                        <form onSubmit={submitComment} className="flex max-sm:ml-1 sm:ml-5">
                            <textarea
                                value={question}
                                className="h-20 w-full rounded-xl border px-2 py-1 text-base shadow-sm"
                                placeholder="Xin mời để lại câu hỏi, BaloShop sẽ trả lời lại trong 1h, các câu hỏi sau 22h - 8h sẽ được trả lời vào sáng hôm sau"
                                onChange={(e) => {
                                    setQuestion(e.target.value);
                                }}
                            ></textarea>
                            {userInfo ? (
                                <div className="ml-2 mr-5 mt-3 min-w-[90px]">
                                    <button className="w-full rounded-lg bg-[var(--main-color)] py-1.5 text-white hover:bg-[var(--main-color-hover)]">
                                        Gửi
                                    </button>
                                </div>
                            ) : (
                                <div className="mt-2">
                                    <Link to="/login">
                                        <button className=" rounded-lg bg-[var(--main-color)] py-2.5 text-sm font-semibold text-white max-sm:mx-1 max-sm:px-1 sm:mx-3 sm:min-w-[100px] sm:px-2">
                                            Đăng nhập
                                        </button>
                                    </Link>
                                </div>
                            )}
                        </form>
                    </div>
                    {/* comment */}
                    <div className="col-md-12 mt-2 rounded bg-white shadow-custom-shadow">
                        <div className="rating-review">
                            {loadingCreateComment && <Loading />}
                            {errorCreateCommentChild && (
                                <Message variant="alert-danger">{errorCreateCommentChild}</Message>
                            )}
                            {product.comments?.map((review) => (
                                <div key={review._id} className="mb-md-2 rounded-5 mb-2 bg-[#ebeced85] p-3">
                                    <div className="">
                                        <div className="flex items-center justify-start">
                                            <div className="flex items-end">
                                                <img
                                                    src={`${review?.user?.image}` || imageDefaul}
                                                    alt="user"
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
                                            <div className=" min-h-16 w-4/5 rounded-xl border-2 border-solid border-[#343a40] bg-white p-3">
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
                                    <div className=" max-md:ml-3 md:ml-8">
                                        {review?.commentChilds?.map((child) => (
                                            <div
                                                key={child._id}
                                                className="mb-md-2 rounded-5 mb-2 mt-2 bg-[#ebeced85] p-3"
                                            >
                                                <div className="flex items-center">
                                                    <div className="flex items-end">
                                                        <div className="min-w-[40px]">
                                                            <img
                                                                src={`${child?.user?.image}` || imageDefaul}
                                                                alt="user"
                                                                className="mr-2 h-10 w-10 rounded-[50%] object-cover"
                                                            />
                                                        </div>
                                                        <div className="min-w-[100px]">
                                                            <strong>{child?.name}</strong>
                                                        </div>
                                                    </div>
                                                    <div className="ml-2 min-w-[170px] pt-3">
                                                        <span>
                                                            {'('}
                                                            {moment(child?.createdAt).format('DD/MM/YYYY')}{' '}
                                                            {moment(child?.createdAt).hours()}
                                                            {':'}
                                                            {moment(child?.createdAt).minutes() < 10
                                                                ? `0${moment(child?.createdAt).minutes()}`
                                                                : moment(child?.createdAt).minutes()}
                                                            {')'}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="mt-3 w-[300px] rounded-xl border-2 border-solid border-[#343a40] bg-white p-2">
                                                    <span>{child?.questionChild}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    {buleanReview === review?._id && (
                                        <form onSubmit={submitQuestionChild} className="ml-6 mt-2 flex">
                                            <textarea
                                                className="h-20 w-[300px] rounded-xl px-2 py-1 text-base shadow-sm"
                                                placeholder="Bình luận"
                                                value={questionChild}
                                                onChange={(e) => {
                                                    setQuestionChild(e.target.value);
                                                }}
                                            ></textarea>
                                            {userInfo ? (
                                                <button className="button my-auto ml-1 rounded-lg bg-[var(--main-color)] px-4 py-2 text-white hover:opacity-80">
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
            ) : (
                ''
            )}
        </>
    );
}

export default AskAndAnswer;
