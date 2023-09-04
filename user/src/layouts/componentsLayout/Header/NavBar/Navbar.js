import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ListCategory } from '~/redux/Actions/ProductActions';
import { productsRemainingSelector } from '~/redux/Selector/productsSelector';
import { Menu } from 'antd';
import MenuItem from 'antd/es/menu/MenuItem';

export default function NavBar() {
    const dispatch = useDispatch();
    const { CategoryList } = useSelector(productsRemainingSelector);
    const { categories } = CategoryList;
    useEffect(() => {
        if (Object.keys(categories).length == 0) {
            dispatch(ListCategory());
        }
    }, []);
    return (
        <>
            <div className="w-[200px] max-use400:w-[150px] sm:w-[200px] md:w-[400px]">
                <Menu
                    mode="horizontal"
                    className="bg-[#f4f4f4] [&_.ant-menu-overflow-item]:leading-7 max-use400:[&_.ant-menu-overflow-item]:leading-5 "
                >
                    {categories?.map((category, index) => (
                        <MenuItem className="" key={index}>
                            <Link className="text-xs font-medium uppercase" to={`/category/${category._id}`}>
                                {category.name}
                            </Link>
                        </MenuItem>
                    ))}
                </Menu>
            </div>
        </>
    );
}
