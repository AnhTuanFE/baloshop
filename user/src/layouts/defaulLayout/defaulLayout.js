import { memo } from 'react';
import Header from '../componentsLayout/Header';
import Footer from '../componentsLayout/Footer';
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
