import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Pagination as PaginationAntd } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleLeft,
    faCircleRight,
    faChevronCircleLeft,
    faChevronCircleRight,
} from '@fortawesome/free-solid-svg-icons';
import './Pagination.css';

// PHÂN TRANG
const Pagination = (props) => {
    const navigate = useNavigate();
    const { page, pages, category = '', keyword = '', rating = '', sortProducts = '' } = props;
    const [pageProduct, setPageProduct] = useState([]);

    const handlerPage = (page) => {
        if (keyword === '' && category === '' && rating === '' && sortProducts === '') {
            navigate(`/page/${page}`);
        }
        if (keyword === '' && category === '') {
            if (rating === '' && sortProducts !== '') {
                navigate(`/sortProducts/${sortProducts}/page/${page}`);
            }
            if (rating !== '' && sortProducts === '') {
                navigate(`/rating/${rating}/page/${page}`);
            }
            if (rating !== '' && sortProducts !== '') {
                navigate(`/sortProducts/${sortProducts}/rating/${rating}/page/${page}`);
            }
        }
        if (keyword !== '' && category === '') {
            if (rating === '' && sortProducts === '') {
                navigate(`/search/${keyword}/page/${page}`);
            }
            if (rating !== '' || sortProducts !== '') {
                navigate(`/search/${keyword}/sortProducts/${sortProducts}/rating/${rating}/page/${page}`);
            }
        }
        if (keyword === '' && category !== '') {
            if (rating === '' && sortProducts === '') {
                navigate(`/category/${category}/page/${page}`);
            }
            if (rating !== '' && sortProducts !== '') {
                navigate(`/category/${category}/sortProducts/${sortProducts}/rating/${rating}/page/${page}`);
            }
        }
    };
    useEffect(() => {
        if (page > 5) {
            const x = [...Array(page).keys()];
            x.splice(0, page - 5);
            setPageProduct(x);
        }
    }, [page, pages]);

    // const itemRender = (item, type, originalElement) => {
    //     if (type === 'prev') {
    //         return (
    //             <span
    //                 style={{
    //                     fontSize: '24px',
    //                 }}
    //                 className="   px-2 py-1 font-bold text-black "
    //             >
    //                 <FontAwesomeIcon className="bg-white" icon={faChevronCircleLeft} />
    //             </span>
    //         );
    //     }
    //     if (type === 'next') {
    //         return (
    //             <span
    //                 style={{
    //                     fontSize: '24px',
    //                 }}
    //                 className=" px-2 py-1 font-bold text-black "
    //             >
    //                 <FontAwesomeIcon icon={faChevronCircleRight} />
    //             </span>
    //         );
    //     }
    //     return (
    //         <div
    //             style={{
    //                 fontSize: '18px',
    //             }}
    //             className="h-full w-full rounded-[50%] bg-[#f3f5f7] font-medium"
    //         >
    //             {originalElement}
    //         </div>
    //     );
    // };
    return (
        pages > 1 && (
            <div className="flex justify-center max-md:mb-5 max-md:mt-2 md:mb-8 md:mt-10">
                <div>
                    <PaginationAntd
                        // className="![&>.ant-pagination-item]:hover:bg-white"
                        defaultCurrent={page}
                        defaultPageSize={1}
                        total={Number(pages)}
                        onChange={handlerPage}
                        // itemRender={itemRender}
                    />
                </div>
            </div>
        )
    );
};

export default Pagination;
