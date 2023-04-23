import Sidebar from '../layoutComponents/SiderBar';
import Header from '../layoutComponents/Header';

function DefaulLayout({ children }) {
    return (
        <div className="Wrapper">
            <Sidebar />
            <div className="main-wrap">
                <Header />
                {children}
            </div>
        </div>
    );
}
export default DefaulLayout;
