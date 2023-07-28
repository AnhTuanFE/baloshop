import { Pagination } from 'antd';

function Header2() {
    const onChange = (pageNumber) => {
        console.log('Page: ', pageNumber);
    };
    return (
        <div className=" my-8">
            <Pagination showQuickJumper defaultCurrent={1} total={500} onChange={onChange} />
        </div>
    );
}

export default Header2;
