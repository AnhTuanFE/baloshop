import { Link, useHistory } from 'react-router-dom';
import clsx from "clsx";
import styles from "./HomeComponentCSS/Suggestions.module.scss";
export default function Suggestions() {
    const keySearch = JSON.parse(localStorage.getItem('keySearch'));
    let history = useHistory();
    const handSearch = (keyword) => {
        history.push(`/search/${keyword}`);
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
