import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
    return (
        pages > 1 && (
            <nav className="flex items-center justify-center" aria-label="Page navigation">
                <div className=" border-[1px solid #ccc] h-6 w-6 cursor-pointer rounded-[50%] text-center text-xl text-[#6785db] hover:text-[#fb5533]">
                    <div onClick={() => handlerPage(page > 1 ? page - 1 : page)}>
                        <i class="fas fa-angle-double-left"></i>
                    </div>
                </div>
                <ul className="flex justify-center">
                    {(page > 5 ? pageProduct : [...Array(pages > 5 ? 5 : pages).keys()]).map((x) => (
                        <li
                            className={`page-item  mx-1 ${x + 1 === page ? 'active' : ''}`}
                            key={x + 1}
                            onClick={() => handlerPage(x + 1)}
                        >
                            <div className="page-link cursor-pointer hover:text-[#fb5533]">{x + 1}</div>
                        </li>
                    ))}
                </ul>
                <div className=" border-[1px solid #ccc] h-6 w-6 cursor-pointer rounded-[50%] text-center text-xl text-[#6785db] hover:text-[#fb5533]">
                    <div onClick={() => handlerPage(page < pages ? page + 1 : page)}>
                        <i class="fas fa-angle-double-right"></i>
                    </div>
                </div>
            </nav>
        )
    );
};

export default Pagination;
