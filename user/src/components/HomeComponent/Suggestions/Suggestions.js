import { Link, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import styles from './Suggestions.module.scss';
export default function Suggestions() {
    const keySearch = JSON.parse(localStorage.getItem('keySearch'));
    const navigate = useNavigate();
    const handSearch = (keyword) => {
        navigate(`/search/${keyword}`);
    };
    return (
        <>
            <div class="list-group list-group__search">
                {keySearch !== null &&
                    keySearch.map((keyword, index) => (
                        <li
                            key={index}
                            class="list-group-item d-flex align-items-center"
                            onClick={() => handSearch(keyword)}
                        >
                            <i class="far fa-search fs-5 pe-2"></i>
                            {keyword}
                        </li>
                    ))}
            </div>
        </>
    );
}
