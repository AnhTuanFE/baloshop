import { memo } from 'react';
import Header from './componenLayout/Header';
import Footer from './componenLayout/Footer';
function DefaulLayout({ children }) {
    return (
        <div className="Wrapper">
            <Header />
            <div className="chilren">{children}</div>
            <Footer />
        </div>
    );
}
export default memo(DefaulLayout);
