import Sidebar from '../layoutComponents/SiderBar';
import Header from '../layoutComponents/Header';
// import { memo } from 'react';

function DefaulLayout({ children }) {
    return (
        <div className="">
            <Sidebar />
            <div className="main-wrap">
                <Header />
                {children}
            </div>
        </div>
    );
}
// export default memo(DefaulLayout);
export default DefaulLayout;
